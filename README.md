# The Ja<span style="color:red">mmm</span>ing App

## Table of Contents

- [General Info](#general-info)
- [Live Version](#live-version)
- [Technologies](#technologies)
- [Features](#features)
- [Bug Fixes](#bug-fixes)
- [Status](#status)
- [Contact](#contact)
- [License](#license)

## General Info

The Ja<span style="color:red">mmm</span>ing App is an intuitive web application that allows users to search for tracks, create playlists, and save them directly to their Spotify account.

## Live Version

The live version of the application can be accessed here: [Jammming App](#)

## Technologies

The project is created with:

- React
- JavaScript
- CSS3
- Spotify Web API
- FontAwesome
- Google Fonts
- Git (for version control)

## Features

The Ja<span style="color:red">mmm</span>ing App boasts several features and functionalities, including:

- **Dynamic Search Functionality**: Users can dynamically search for tracks and view their details.
- **Playlist Management**: Users can create and save their playlists to their Spotify account.
- **Integration with Spotify**: Seamlessly authenticate, fetch user details, and integrate playlists with a user's Spotify account.
- **Mobile Navigation**: Enhanced user experience on mobile devices with a toggle feature between search results and playlist views.
- **Feedback Mechanisms**: Toast notifications provide clear success and error messages to enhance the user experience.

## Bug Fixes

- **Empty Playlist Saves**: Resolved an issue where empty or unnamed playlists could be saved to Spotify.
- **Search Experience Glitch**: Fixed a user experience glitch where searches could be triggered with an empty query after clearing the input with the "X" icon.
- **Authentication Infinite Loop**: Addressed a critical bug where user authentication led to an infinite loop. The resolution, although not ideal, involved not clearing the token from the URL. As a result, the access token remains exposed in the URL, but it ensures the app functions correctly.

## Status

The project is complete and fully functional. Regular updates and improvements may be carried out in the future.

## Contact

Created by [Stoyan Peev](https://stoyanvisuals.com)

- Website - [https://stoyanvisuals.com](https://stoyanvisuals.com)
- Email - [info@stoyanvisuals.com](mailto:info@stoyanvisuals.com)
- X / Twitter - [@stoyanvisuals](https://twitter.com/stoyanvisuals)

## License

This project is licensed under the MIT License. You're welcome to view, modify, and distribute the code as per the terms of the MIT License. For more details, see the [MIT License](https://opensource.org/licenses/MIT).

[Back To The Top](#spotify-playlist-maker)
