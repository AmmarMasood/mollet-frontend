import React from "react";
import styles from "@/styles/News/TopHeader.module.css";
import Loader from "../Loader";

function TopHeader({
  channels,
  onChannelSelect,
  currentChannel,
  showSentiment,
}) {
  return (
    <div className={styles.container}>
      <div
        className={
          showSentiment ? styles.channelNameSelected : styles.channelName
        }
        span={6}
        key={1}
        onClick={() => onChannelSelect({ alias: "sentiment" })}
      >
        MARKET SENTIMENT
      </div>
      {channels.map((channel, key) => (
        <div
          className={
            currentChannel === channel.alias
              ? styles.channelNameSelected
              : styles.channelName
          }
          span={6}
          key={key + 100}
          onClick={() => onChannelSelect(channel)}
        >
          {channel.name}
        </div>
      ))}
    </div>
  );
}

export default TopHeader;
