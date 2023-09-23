import React, { useState, useEffect } from 'react';
import LogoBar from './components/LogoBar';
import SearchBar from './components/SearchBar';
import Container from './components/Container';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import MobileNav from './components/MobileNav';

function App() {
  const [activeView, setActiveView] = useState('results');
  const [accessToken, setAccessToken] = useState('');
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };

    fetchToken();
  }, []);

  const getAccessToken = async () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();

    return data.access_token;
  };

  const handleSearch = async (query) => {
    if (!accessToken) return;

    const results = await searchTracks(query, accessToken);
    setTracks(results);
  };

  const searchTracks = async (query, token) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data.tracks.items;
  };

  return (
    <div className='App'>
      <LogoBar />
      <SearchBar onSearch={handleSearch} />
      <MobileNav setActiveView={setActiveView} />
      <Container>
        <SearchResults
          activeView={activeView}
          tracks={tracks}
        />
        <Playlist activeView={activeView} />
      </Container>
    </div>
  );
}

export default App;
