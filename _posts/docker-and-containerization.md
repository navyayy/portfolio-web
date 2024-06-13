---
title: "Docker and Containerization"
excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus."
coverImage: "/assets/blog/preview/cover.jpg"
date: "2020-03-16T05:35:07.322Z"
author:
  name: Navya Srivastav
  picture: "/assets/blog/authors/navyayy.png"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

## Docker and Containerization

The deployment of several programmes without the need to start a separate virtual machine for each one is known as containerization at the operating system level. An isolated system with a single kernel instead hosts numerous applications. E.g. Docker, rkt.

A well-known open-source containerization programme built on Linux containers is called Docker. It is currently the most effective containerization technology available. People frequently refer to the Docker container as a "lightweight VM" while discussing Docker. However, a container and a virtual machine are actually very dissimilar.

One or more virtual machines typically run on top of a physical system in a typical virtualized environment utilising a hypervisor.
On top of the operating system kernel, containers, on the other hand, execute in userspace. The Linux kernel's namespace and control group capabilities are used to segregate containers within a host.
A piece of software is packaged in a complete filesystem with all of the necessary components using Docker containers (code, runtime, system tools, and system libraries – anything you can install on a server). Regardless of the environment it is running in, this ensures that it will always operate the same. Thus, the problem of "It works in my machine" is avoided.

It is frequently used in development and testing settings where you may instantly construct containers and then destroy them after the requirement has been confirmed or tested. Currently, it is also utilised in production where you can simply scale up and down the containers based on the load of the application thanks to orchestration solutions that are production-ready, such Docker Swarm and Kubernetes.

Advantages and Disadvantages of Docker

Despite the fact that adopting Docker has many benefits, its two most important benefits are as follows:

* When there are increases in user activity, containers can be spun up faster.
* We can always spin up more containers than virtual machines on a server since containers don't have OS overheads.

One significant drawback is that a container is less secure than a virtual machine (VM) because it uses the same kernel and has root access, which means that containers are less isolated from one another. If the kernel has a flaw, it may also jeopardise the security of other containers. Many clients are discouraged from using Docker in real situations because of this main barrier.

Each programme was formerly hosted on a separate physical machine, using just 10% of that system's total capacity. Virtualization's development resulted in a substantial percentage rise in overall capacity use. Even so, some of the computer's capacity was squandered due to the installation of full OS versions on each virtual machine (each of which consumed some RAM, CPU, and disc space). Containerization and Docker both addressed this issue. The lack of additional OS installation required by Docker containers frees up computer capacity that can be used to host applications.
Is there anything available now that can replace Docker?
The industry is currently shifting away from substantial modifications and toward more lightweight infrastructure. The most likely option for the coming steps is “unikernels”.
The libraries necessary for the OS that the application needs to run are selected in this case, and the application and configuration code are then compiled to create the Unikernel fixed-purpose image, which runs natively on hypervisors. This improves the machine's capacity utilisation even more.
