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
    <div className="h-full lg:px-24 lg:py-20">
      <ReleasesGrid />
    </div>
  );
};

export default ReleasesPage;
