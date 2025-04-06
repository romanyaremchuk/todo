//import React from "react";
import * as FaIcon from "react-icons/fa";
//import * as AiIcon from "react-icons/ai";
import * as IoIcon from "react-icons/io";

export const SideBarBaseData = [
  {
    title: "All Tasks",
    path: "/",
    icon: FaIcon.FaTasks,
    elementClassName: "nav-text",
  },
  {
    title: "Completed Tasks",
    path: "/CompletedTasks",
    icon: IoIcon.IoIosDoneAll,
    elementClassName: "nav-text",
  },
  {
    title: "Uncompleted Tasks",
    path: "/UncompletedTasks",
    icon: FaIcon.FaTasks,
    elementClassName: "nav-text",
  },
];
