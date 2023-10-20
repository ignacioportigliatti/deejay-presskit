import ReleasesGrid from "@/components/presskit/releases/releases-grid";
import React from "react";

interface ReleasesPageProps {
  params: {
    artistName: string;
  };
}

const ReleasesPage = async (props: ReleasesPageProps) => {
  const { params } = props;

  return (
    <div className="h-full flex items-start justify-start max-w-[960px]">
      <ReleasesGrid />
    </div>
  );
};

export default ReleasesPage;
