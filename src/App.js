import React, { useState, useEffect } from 'react';
import LogoBar from './components/LogoBar';
import SearchBar from './components/SearchBar';
import Container from './components/Container';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import MobileNav from './components/MobileNav';

function App() {
  // State variables to manage app's data and view
  const [activeView, setActiveView] = useState('results');
  const [accessToken, setAccessToken] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Spotify API configurations
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = 'http://localhost:3000';
  const SCOPES = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
  const TOKEN_RENEWAL_BUFFER = 5 * 60 * 1000;

  // Construct authorization URL for Spotify
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=${encodeURIComponent(
    SCOPES
  )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  // Function to parse the access token from the URL
  const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
  };

  useEffect(() => {
    // Check if we need to proactively renew the token
    const tokenExpirationTime = localStorage.getItem('spotifyTokenExpirationTime');
    if (tokenExpirationTime) {
      const timeRemaining = Number(tokenExpirationTime) - new Date().getTime();
      if (timeRemaining <= TOKEN_RENEWAL_BUFFER) {
        // Time is within the buffer, renew the token
        localStorage.removeItem('spotifyAccessToken');
        localStorage.removeItem('spotifyTokenExpirationTime');
        window.location = AUTH_URL;
      }
    }
  }, [AUTH_URL, TOKEN_RENEWAL_BUFFER]);

  // Effect hook to handle Spotify authentication and token retrieval
  useEffect(() => {
    const hash = getTokenFromUrl();
    const token = hash.access_token;
    const expiresIn = hash.expires_in;

    if (token) {
      // Token found in the URL
      // Calculate token expiration time
      const expirationTime = new Date().getTime() + expiresIn * 1000;

      // Store token and its expiration time in local storage
      localStorage.setItem('spotifyAccessToken', token);
      localStorage.setItem('spotifyTokenExpirationTime', expirationTime.toString());

      setAccessToken(token);
      setIsAuthenticated(true);
    } else {
      const localToken = localStorage.getItem('spotifyAccessToken');
      const tokenExpirationTime = localStorage.getItem('spotifyTokenExpirationTime');

      if (localToken && tokenExpirationTime && new Date().getTime() < Number(tokenExpirationTime)) {
        // Token is valid and not expired, set it to the state
        setAccessToken(localToken);
        setIsAuthenticated(true);
      } else if (!isAuthenticated) {
        // No valid token found, redirect to Spotify for authentication
        localStorage.removeItem('spotifyAccessToken');
        localStorage.removeItem('spotifyTokenExpirationTime');
        window.location = AUTH_URL;
      }
    }
  }, [isAuthenticated, AUTH_URL]);

  // Function to get the user ID from Spotify
  const getUserId = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data.id;
  };

  // Function to create a new playlist on Spotify
  const createPlaylist = async (userId, playlistName, token) => {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playlistName,
      }),
    });

    const data = await response.json();
    return data.id;
  };

  // Function to clear the playlist
  const clearPlaylist = () => {
    setPlaylistTracks([]);
  };

  // Function to add tracks to a playlist on Spotify
  const addTracksToPlaylist = async (userId, playlistId, trackURIs, token) => {
    await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: trackURIs,
      }),
    });
  };

  // Function to save the playlist to Spotify
  const savePlaylistToSpotify = async () => {
    try {
      const userId = await getUserId(accessToken);
      const playlistId = await createPlaylist(userId, playlistName, accessToken);
      const trackURIs = playlistTracks.map((track) => track.uri);
      await addTracksToPlaylist(userId, playlistId, trackURIs, accessToken);

      // Reset the playlist name and tracks in the state
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    } catch (error) {
      console.error('Error saving playlist to Spotify:', error);
    }
  };

  // Function to handle track search
  const handleSearch = async (query) => {
    if (!accessToken || !isTokenValid()) {
      // If the token is not set or not valid, return early
      return;
    }

    const results = await searchTracks(query, accessToken);
    setTracks(results);
  };

  // Function to request Spotify API for track search
  const searchTracks = async (query, token) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response status is 401 (Unauthorized)
    if (response.status === 401) {
      // Clear local storage and redirect to Spotify for re-authentication
      localStorage.removeItem('spotifyAccessToken');
      localStorage.removeItem('spotifyTokenExpirationTime');
      window.location = AUTH_URL;
      return [];
    }

    const data = await response.json();

    // Ensure that 'data.tracks' exists before trying to access 'items'
    if (data.tracks) {
      return data.tracks.items;
    } else {
      console.error('Unexpected response from Spotify:', data);
      return [];
    }
  };

  // Function to check if the token is valid
  const isTokenValid = () => {
    const tokenExpirationTime = localStorage.getItem('spotifyTokenExpirationTime');
    return new Date().getTime() < Number(tokenExpirationTime);
  };

  // Function to add a track to the playlist
  const addToPlaylist = (track) => {
    if (!playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  // Function to remove a track from the playlist
  const removeFromPlaylist = (track) => {
    setPlaylistTracks(playlistTracks.filter((savedTrack) => savedTrack.id !== track.id));
  };

  // Function to update the name of the playlist
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
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
          onAdd={addToPlaylist}
          playlistTracks={playlistTracks}
        />
        <Playlist
          activeView={activeView}
          name={playlistName}
          tracks={playlistTracks}
          onRemove={removeFromPlaylist}
          onNameChange={updatePlaylistName}
          onSave={savePlaylistToSpotify}
          onClear={clearPlaylist}
        />
      </Container>
    </div>
  );
}

export default App;
