"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([]);

  const handleTagClick = async (tag) => {
    setSearchText(tag);
    const searchInDB2 = await fetch('/api/prompt/search', {
      method: "POST",
      body: JSON.stringify({
        search: searchText,
        type: "tag"
      })
    })
    const data2 = await searchInDB2.json();
    setPosts(data2);
  }

  const handleSearchChange = async (e) => {
    e.preventDefault();

    setSearchText(e.target.value)
    const searchTerm = (searchText.length < 2) ? '' : searchText;
    // search DB table and filter by search 
    const searchInDB = await fetch('/api/prompt/search', {
      method: "POST",
      body: JSON.stringify({
        search: searchTerm,
        type: "input"
      })
    })

    const data1 = await searchInDB.json();
    setPosts(data1);

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data)
    }
    fetchPosts();
  }, [])



  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>


      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />


    </section>
  )
}

export default Feed