"use client";

import { Dropdown, Navbar, Avatar } from "flowbite-react";
import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import Easyflex from "../../assets/images/easyflex.svg";
export default function HeaderSite() {
  useEffect(() => {
    localStorage.setItem("theme", "light");
  }, []);
  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand href="#">
        <Image
          src={Easyflex}
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
          width={100}
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          href="#"
          active
        >
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
