---
title: 'Arch Linux Installation'
description: "Every manual step I do to install Arch Linux."
author: 'Xavier Chanthavong'
date: '2025-10-19'
published: false
---

## Preface

This is how I prefer to install Arch Linux. It's important to be mindful
of your system's security, this isn't 100% foolproof, but I wouldn't be
comfortable travelling with an Arch installation without this.

There were three main sources I referenced when coming up with my own setup:

- [The Arch Wiki](https://wiki.archlinux.org/)
- [OdinsPlasmaRifle's LVM on LUKS guide](https://gist.github.com/OdinsPlasmaRifle/e16700b83624ff44316f87d9cdbb5c94)
- [Jpetazzo's guide on Secure Boot](https://jpetazzo.github.io/2024/02/23/archlinux-luks-tpm-secureboot-install/)

If you want to see why I run Arch, see this
[blog post](./settling-into-arch-linux).

## Table of Contents

- [Preparation steps](#preparation-steps)
- [Drive partitioning](#drive-partitioning)
- [Basic Arch installation](#basic-arch-installation)
- [Setting up my per-system settings](#setting-up-per-system-settings)
- [Setting up disk encryption](#setting-up-disk-encryption)
- [Setting up LVM](#setting-up-lvm)
- [Creating unified kernel images](#creating-unified-kernel-images)
- [Signing UKIs](#signing-ukis)
- [Setting up secure boot](#setting-up-secure-boot)
- [Storing the LUKS key in the TPM](#storing-the-luks-key-in-the-tpm)

## Preparation Steps

### Installation USB

First things first, prepare yourself an Installation USB following the Arch
Wiki's
[Installation Guide](https://wiki.archlinux.org/title/Installation_guide).

I will be referencing the Arch Wiki alot, as should any Linux user. It's a great
source for learning about Linux regardless of the distro, though some things of
course are going to be Arch specific.

### BIOS preparation for Secure Boot

First, jump into BIOS and disable secure boot.
Then put Secure Boot into Setup Mode.

Now boot into the live USB.

### Network Access

Ensure you have a network connection:

```sh
ping archlinux.org
```

Use iwctl if you need to make a wifi connection:

```sh
iwctl station wlan0 scan
iwctl station wlan0 connect <SSID>
```

Sync the system clock using ntp

```sh
timedatectl set-ntp true
```

Update the pacman mirrors:

```sh
reflector --save /etc/pacman.d/mirrorlist  --protocol https --latest 5 --sort age
```

Or download the live list and add the appropriate entries to
`/etc/pacman.d/mirrorlist`:

```sh
curl -L https://archlinux.org/mirrorlist/all/https/ -o ~/mirrorlist
```

## Drive Partitioning

To follow this guide, drive partitioning must be done slightly carefully.
There are ways to auto-mount the root drive based on gpt type, though I haven't
found a way yet with LUKS on LVM (my preferred way to do disk encryption). You
can read more about that
[here](https://wiki.archlinux.org/title/Dm-crypt/Encrypting_an_entire_system).

There are two main ways to do partitioning, I take no credit for this, I'm
summarizing for my own records. All credit for this goes to Jpetazzo and his
post (linked above).

Option one uses a single Boot partition which serves as the ESP
(EFI System Partition) and contains all of the boot information for Arch Linux.

Option two separates the partition into an ESP (which can be small) and a
Linux extended boot partition. Jpetazzo recommends 1G in size, I typically opt
for 2G since I like to have multiple kernels installed.

Since we will be creating and signing UKIS, we need a decent amount of space
in the Boot partition, so if your partition is less than a Gigabyte, I recommend
going with option two and using a separate extended boot partition.

You will also probably want to go with Option two if you will be dual booting
or can't expand the existing ESP.

### Partitioning

List out disks so we know which disk to partition:

```sh
lsblk
```

Optionally, shred the disk which will FULLY WIPE IT:
```sh
shred -v -n1 /dev/<YOUR DISK>
```

Feel free to use which ever partitioning tool you're most comfortable with.
The type codes I'm providing work in fdisk, gdisk, and sgdisk.

#### Partition 1:

We always need an ESP partition which will use typecode: `ea00`.

#### Partition 2:

We will also need the LVM partition: `8e00`.

#### Partition 3 (optional):

If we are also using an extended boot partition it will use: `ef00`.

### Format the boot file systems

```sh
mkfs.fat -F32 /dev/nvme0n1p1
```

And if you've got an extended boot partition:

```sh
mkfs.fat -F32 /dev/nvme0n1p3
```

## Setting up Disk Encryption

N.B. These next two sections come from OdinsPlasmaRifle's guide linked above.

Enable dm-crypt using modprobe:

```sh
modprobe dm-crypt
```

Encrypt the disk:

```sh
cryptsetup luksFormat --type luks2 /dev/nvme0n1p2
```

Open the disk:
```sh
cryptsetup open /dev/nvme0n1p2 cryptlvm
```

## Setting up LVM

Ensure the disk was opened correctly:

```sh
ls /dev/mapper/cryptlvm
```

Create a physical volume and volume group on the disk:

```sh
pvcreate /dev/mapper/cryptlvm
vgcreate volume /dev/mapper/cryptlvm
```

Create the logical partitions:

```sh
lvcreate -L32G volume -n swap
lvcreate -L120G volume -n root
lvcreate -L240G  volume -n home
```

Feel free to tweak the numbers. I typically like to keep space free for
the future.

Format the filesystem on the logical partitions:

```sh
mkfs.ext4 /dev/volume/root
mkfs.ext4 /dev/volume/home
mkswap /dev/volume/swap
```

Now mount everything:
```sh
mount /dev/volume/root /mnt
mkdir /mnt/home
mount /dev/volume/home /mnt/home
swapon /dev/volume/swap
```

If you went with a single boot disk, mount it at `/boot`:

```sh
mkdir /mnt/boot
mount /dev/nvme0n1p1 /mnt/boot
```

If you've got the extended boot disk mount it at `/boot`, and the ESP at `/efi`:

```sh
mkdir /mnt/efi
mkdir /mnt/boot

mount /dev/nvme0n1p1 /mnt/efi
mount /dev/nvme0n1p3 /mnt/boot
```

## Basic Arch Installation

### Install Base Packages

Now install your usual base packages:

```sh
pacstrap /mnt base base-devel linux linux-lts linux-firmware linux-headers \
  sudo git less man-db man-pages iw iwd dhcpcd \
  lvm2 sbctl sbsigntools systemd-ukify tpm2-tools
```

We've added the following additional packages here since we will need these as
part of this guide:

- lvm2
- sbctl
- sbsigntools
- systemd-ukify
- tpm2-tools

### Generate fstab file (mounts)

Now we can generate an fstab file for the mounts we setup in the previous step:

```sh
genfstab -U /mnt >> /mnt/etc/fstab
```

### Chroot into the System

And finally chroot into the installed system:

```sh
arch-chroot /mnt
```

### Locale

Set up time locale (I'm in eastern time, change to your own zoneinfo):

```sh
ln -sf /usr/share/zoneinfo/America/New_York /etc/localtime
```

Set the hardware clock based on the current system time:

```sh
hwclock --systohc
```

Set up locale info (pick your own preferred locales):

```sh
echo en_CA.UTF-8 UTF-8 >> /etc/locale.gen
echo en_US.UTF-8 UTF-8 >> /etc/locale.gen
locale-gen
locale | sed -e '/LANG=.*/LANG=en_US.UTF-8/' > /etc/locale.conf
```

### Hostname

Set your system hostname:

```sh
vim /etc/hostname
vim /etc/hosts
```

### User

Set the environment variable `MYUSER` with your username:

```sh
echo "%wheel ALL=(ALL:ALL) ALL" >> /etc/sudoers.d/wheel
useradd -m $MYUSER
usermod -aG wheel $MYUSER
```

Set the root password:
```sh
passwd
```

Set your user password:
```sh
passwd $MYUSER
```

### Install the bootloader

```sh
bootctl install
```

Based on our setup above, if `/efi` exists, it will automatically be used for
ESP otherwise `/boot` will be. We don't need to specify any arguments. Though,
if you want to be explicit:

```sh
bootctl install --boot-path=/boot --esp-path=/efi
```

## Creating Unified Kernel Images

Jpetazzo's guide helped a ton with getting Secure boot setup and TPM enrollment
working.

Edit the hooks in `/etc/mkinitcpio.conf`:

```bash
HOOKS=(base systemd keyboard autodetect microcode modconf kms sd-vconsole block lvm2 sd-encrypt filesystems fsck)
```

You will notice that keyboard is ahead of autodetect, this ensure the keyboard
is loaded in case you don't set up the TPM to decrypt the LUKS partition. That
way you'll be able to type your password manually without any issues.

Make sure to update the presets and enable the uki, they should be installed in
`/boot` since thats where we've ensure there's enough allocated space for them.

`/etc/mkinitcpio.d/linux.preset`:

```sh
# mkinitcpio preset file for the 'linux' package

#ALL_config="/etc/mkinitcpio.conf"
ALL_kver="/boot/vmlinuz-linux"

PRESETS=('default' 'fallback')

#default_config="/etc/mkinitcpio.conf"
default_image="/boot/initramfs-linux.img"
default_uki="/boot/EFI/Linux/arch-linux.efi"
#default_options="--splash /usr/share/systemd/bootctl/splash-arch.bmp"

#fallback_config="/etc/mkinitcpio.conf"
fallback_image="/boot/initramfs-linux-fallback.img"
fallback_uki="/boot/EFI/Linux/arch-linux-fallback.efi"
fallback_options="-S autodetect"
```

`/etc/mkinitcpio.d/linux-lts.preset`:

```sh
# mkinitcpio preset file for the 'linux-lts' package

#ALL_config="/etc/mkinitcpio.conf"
ALL_kver="/boot/vmlinuz-linux-lts"

PRESETS=('default' 'fallback')

#default_config="/etc/mkinitcpio.conf"
default_image="/boot/initramfs-linux-lts.img"
default_uki="/boot/EFI/Linux/arch-linux-lts.efi"
#default_options="--splash /usr/share/systemd/bootctl/splash-arch.bmp"

#fallback_config="/etc/mkinitcpio.conf"
fallback_image="/boot/initramfs-linux-lts-fallback.img"
fallback_uki="/boot/EFI/Linux/arch-linux-lts-fallback.efi"
fallback_options="-S autodetect"
```

Now, since we are building UKIs we won't be setting up any loader entries. To
make sure the system opens the LUKS LVM drive, we need to setup kernel options
that are built into the UKI.

Add the following to `/etc/cmdline.d/cryptlvm.conf`:

```sh
rd.luks.name=<LVM UUID HERE>=cryptlvm
root=/dev/volume/root
```

You can use the following vim normal command to get the UUID:

```sh
:r!blkid /dev/nvme0n1p2
```

You can build these now, but they need to be signed, thus it's better to setup
secure boot before building.

## Setting Up Secure Boot

Ensure that your secure boot setup mode is enabled, or reboot to enable it:

```sh
sbctl status
```

Create your own signing keys:

```sh
sbctl create-keys
```

Sign the systemd bootloader:

```sh
sbctl sign -s \
  -o /usr/lib/systemd/boot/efi/systemd-bootx64.efi.signed \
  /usr/lib/systemd/boot/efi/systemd-bootx64.efi
```

Enroll your custom keys:

```sh
sbctl enroll-keys --microsoft
```

`--microsoft` will include the Microsoft keys into key enrollment.
My machine wasn't happy when I tried to run without, but YMMV.
I may end up dual booting, so I kept them around.

Now we should be ready to build the UKIs:

```sh
mkinitcpio --allpresets
```

The UKIs will automatically be signed by `systemd-ukify` through a hook in
mkinitcpio, so all we have to do is sign the main EFI binaries.

If you've only got a single boot partition:

```sh
sbctl sign -s /boot/EFI/systemd/systemd-bootx64.efi
sbctl sign -s /boot/EFI/Boot/bootx64.efi
```

If you've got a separate ESP and extended partition:

```sh
sbctl sign -s /efi/EFI/systemd/systemd-bootx64.efi
sbctl sign -s /efi/EFI/Boot/bootx64.efi
```

Now verify the signing:

```sh
sbctl verify
```

You will have verified signing of the UKIs through mkinitcpio.

## Enrolling a TPM key for LUKS decryption

Generate a recovery key for the LUKS device, put it somewhere safe:

```sh
systemd-cryptenroll --recovery-key /dev/nvme0n1p2
```

Generate a key in the TPM and add it to a key slot in the LUKS device:

```sh
systemd-cryptenroll --temp2-device=auto /dev/nvme0n1p2 --tpm2-pcrs=7
```

You can change the tpm pcrs setting if you like, see
`man systemd-cryptenroll.1`.

A PCRS of 7 makes the key available through updates of the kernel and initrds.
However, secure boot being disabled, or secure boot keys being altered will
disable it.

Next, check if we need to load kernel modules. First get the name of the module
for your tpm:

```sh
systemd-cryptenroll --tpm2-device=list
```

Then check if it will need to be loaded:

```sh
lsmod | grep tpm
```

If the output is empty you're good. Otherwise, add it to the modules in
`/etc/mkinitcpio.conf`:

```sh
MODULES=()
```

And if you needed to add a module, you will need to rebuild:

```sh
mkinitcpio --allpresets
```

Test the secure boot configuration, by shutting down and enabling secure boot.

```sh
exit
```

```sh
umount -R /mnt
```

```sh
shutdown now
```

Now restart and enter BIOS, enabling secure boot. Boot into the machine.

If all is well and the TPM decrypted your LUKS device (i.e. no password to enter
for decryption) then you can remove the password you set for it:

```sh
systemd-cryptenroll /dev/nvme0n1p2 --wipe-slot=password
```
