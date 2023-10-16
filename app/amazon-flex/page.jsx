"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useContextoApp } from "../contexto-app";
import { Button, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList } from "react-icons/hi";
import { FaMapLocation } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import SettingsAmazonFlex from "./settings";
import SelectLocations from "./select-locations";
export default function AmazonFlexHome() {
  const { afActiveTab, setAfActiveTab } = useContextoApp();
  let tabsRef = useRef(null);
  useEffect(() => {
    console.log("llega");
    tabsRef.current?.setActiveTab(afActiveTab);
  }, [afActiveTab]);

  return (
    <main className="flex flex-col  min-h-screen max-h-screen items-center justify-between p-3  md:p-20">
      <>
        <Tabs.Group
          aria-label="Default tabs"
          style="default"
          ref={tabsRef}
          onActiveTabChange={(tab) => setAfActiveTab(tab)}
          active={afActiveTab}
        >
          {" "}
          <Tabs.Item
            title="Settings"
            icon={HiAdjustments}
          >
            <SettingsAmazonFlex />
          </Tabs.Item>{" "}
          <Tabs.Item
            title="Ubicaciones"
            icon={FaMapLocation}
          >
            <SelectLocations />
          </Tabs.Item>
          <Tabs.Item
            title="Dashboard"
            icon={MdDashboard}
          >
            This is{" "}
            <p className="font-medium text-gray-800 dark:text-white">
              Dashboard tab's associated content
            </p>
            <p>
              This dashabord will content all information about your blocks and
              earnings.
            </p>
          </Tabs.Item>
        </Tabs.Group>
      </>
    </main>
  );
}
