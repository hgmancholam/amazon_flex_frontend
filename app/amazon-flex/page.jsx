"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useContextoApp } from "../contexto-app";
import { Button, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import SettingsAmazonFlex from "./settings";
export default function AmazonFlexHome() {
  const { afActiveTab, setAfActiveTab } = useContextoApp();

  return (
    <main className="flex flex-col  min-h-screen max-h-screen items-center justify-between p-10  md:p-20">
      <>
        <Tabs.Group
          aria-label="Default tabs"
          style="default"
          onActiveTabChange={(tab) => setAfActiveTab(tab)}
          active={afActiveTab}
        >
          {" "}
          <Tabs.Item
            title="Settings"
            icon={HiAdjustments}
          >
            <SettingsAmazonFlex />
          </Tabs.Item>
          <Tabs.Item
            title="Profile"
            icon={HiUserCircle}
          >
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Profile tab associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </Tabs.Item>
          <Tabs.Item
            title="Dashboard"
            icon={MdDashboard}
          >
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Dashboard tab's associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </Tabs.Item>
          <Tabs.Item
            title="Contacts"
            icon={HiClipboardList}
          >
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Contacts tab's associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </Tabs.Item>
        </Tabs.Group>
      </>
    </main>
  );
}
