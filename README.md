Search the Sound!

Interactive playlist builder that allows you to create playlist of top songs from your favorite artists as well as get information on others that you might enjoy!

Features:
- Search artists to get their picture, bio, top tracks, and similar artists in search results.
- Click on past searches to get their search results
- Click button below track to add to playlist
- User Login, and personalize playlist
- Adjust Tracks on playlist 


#Product Description
Start by loginning in and creating your profile.  By using the search bar you can look for your favorite artist. The search will result show artist picture, bio, similar artists, and top tracks. From there you can add tracks to your playlist, by clicking the button next to the songs.  Below you can either go to your playlist by clicking the button below or continue to search for other artist.  You can also go to previously searched for artist by clicking on the artist name below the search bar.  On the playlist it will list all the songs that you've added.  You can change the playlist by clicking on the song and moving it to where you want it. 


![Site Pre-Search](https://github.com/DHernandez24e/search-the-sound/blob/master/pic1.PNG)

![After Search](https://github.com/DHernandez24e/search-the-sound/blob/master/pic2.png)


Deployed Site: https://dhernandez24e.github.io/search-the-sound/

Features:
- Search artists to get their picture, bio, top tracks, and similar artists in search results.
- Click on past searches to get their search results
- Click button below track to add to playlist
- User Login, and personalize playlist
- Adjust Tracks on playlist 


API Used and the following information pulled from each site:

LastFM:
      -Artists Bio
      -Similar Artists
      -Track Listing
      
Audiodb
      -Artists Picture 
      
Foundation (CSS)
       -Style Sheet 
      
How It's Done:

By using an API key we were able to gather the infomation based on the search critiea of each site.  API key not listed as to protect information from being hacked.  Combine that with jquery with were able to saved data  to the local storage and pull it to the page using JSON and stringify.  By combining jquery and foundation we were able to create a clean and effective UI, including search bar, login, and interactive buttons that take you to your playlist page. 

Github Repository: https://github.com/DHernandez24e/search-the-sound
