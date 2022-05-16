import Layout from "@/components/Layout";
import ExploreSection from "@/components/News/ExploreSection";
import TopHeader from "@/components/News/TopHeader";
import SentimentSection from "@/components/News/SentimentSection";
import React, { useState, useEffect, useContext } from "react";
import { getMarketPerformance, getNews } from "@/apis/News/news";
import { toast, ToastContainer } from "react-toastify";
import MarketPerformance from "@/components/News/MarketPerformance";

const channels = [
  {
    name: "BUSINESS RECORDER",
    alias: "br",
  },
  {
    name: "DAWN",
    alias: "dawn",
  },
  {
    name: "NATION",
    alias: "nation",
  },
  {
    name: "PROFIT",
    alias: "profit",
  },
];

function Index() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sentimentLoading, setSentimentLoading] = useState(false);
  const [performanceLoading, setPerformanceLoading] = useState(false);

  const [currentChannel, setCurrentChannel] = useState(channels[0].alias);

  const [showSentiment, setShowSentiment] = useState(false);
  const [marketPerformance, setMarketPerformance] = useState([]);

  const onChannelSelect = (channel) => {
    if (channel.alias === "sentiment") {
      setCurrentChannel("");
      setShowSentiment(true);
    } else {
      setShowSentiment(false);
      setCurrentChannel(channel.alias);
    }
  };

  const getNewsFromBack = async () => {
    setLoading(true);
    const res = await getNews(currentChannel);
    if (res.success) {
      setNews(res.data);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  const getMarketPerformanceFromBack = async () => {
    setPerformanceLoading(true);
    const res = await getMarketPerformance();
    if (res.success) {
      console.log(res.data);
      setMarketPerformance(res.data);
    } else {
      toast.error(res.message);
    }
    setPerformanceLoading(false);
  };
  const getMarketSentiment = () => {};
  useEffect(() => {
    getMarketPerformanceFromBack();
  }, []);
  useEffect(() => {
    showSentiment && getMarketSentiment();
  }, [showSentiment]);
  useEffect(() => {
    currentChannel && getNewsFromBack();
  }, [currentChannel]);
  return (
    <Layout
      childern={
        <>
          <ToastContainer />
          <MarketPerformance
            performance={marketPerformance}
            loading={performanceLoading}
          />
          <TopHeader
            channels={channels}
            loading={loading}
            currentChannel={currentChannel}
            onChannelSelect={onChannelSelect}
            showSentiment={showSentiment}
          />
          {showSentiment ? (
            <SentimentSection loading={sentimentLoading} sentiment={[]} />
          ) : (
            <ExploreSection news={news} loading={loading} />
          )}
        </>
      }
    />
  );
}

export default Index;
