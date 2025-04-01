import React, { useState } from "react";
import StoryForm from "./StoryForm";
import StoryFeed from "./StoryFeed";




const CommunitySupport = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <h2>Community Support</h2>
            <StoryForm onStoryAdded={() => setRefresh(!refresh)} />
            <StoryFeed refresh={refresh} />
        </div>
    );
};

export default CommunitySupport;

