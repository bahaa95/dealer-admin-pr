"use client";
import React, { FC } from "react";
import TimeAgo from "javascript-time-ago";
import ar from "javascript-time-ago/locale/ar";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(ar);

type TimeagoProps = {
  date: Date;
};

export const Timeago: FC<TimeagoProps> = ({ date }) => {
  return <ReactTimeAgo date={date} locale="ar" />;
};
