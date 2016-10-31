<template>
  <div class="tracklist">
    <div class="col-md-3" v-for="track in descTracks" :key="track.played">
      <div class="card thumbnail">
        <div class="hover-btn">
          <a :href="'https://players.turbo.trackmania.com'+track.url" class="btn btn-primary btn-sm" target="_blank">Open</a>
          <a :href="'https://players.turbo.trackmania.com/ps4/maps/favorites/' + track.url.split('/').pop() + '/add'" class=" btn btn-primary btn-sm" target="_blank">Add to Favorites</a>
        </div>
        <img class="card-img-top img-fluid" :src="track.img" :alt="track.name">

        <div class="card-block text-xs-center">
          <h4 class="card-title">{{ track.name }}</h4>
          <h6 class="card-subtitle text-muted">by {{ track.author }}</h6>
          <p>
            <span class="tag tag-info">{{ track.type }}</span>
            <span class="tag tag-info">{{ track.style }}</span>
            <span class="tag tag-info">{{ track.length }}</span>
          </p>
          <table class="table table-sm">
            <tbody>
              <tr>
                <th scope="row">Plays</th>
                <td>{{ track.played }}</td>
              </tr>
              <tr>
                <th scope="row">Votes</th>
                <td>{{ track.ratingcount }}</td>
              </tr>
              <tr>
                <th scope="row">Rating</th>
                <td>{{ track.rating }} / 5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> 
    
    
  </div>
</template>

<script>
  import Firebase from 'firebase'
  const firebaseApp = Firebase.initializeApp({'databaseURL': 'https://tmttracks.firebaseio.com/'})
  const db = firebaseApp.database()
  const tracksRef = db.ref('tracks')

  export default {
    name: 'Tracklist',
    data () {
      return {
      }
    },
    firebase: {
      tracks: tracksRef.orderByChild('played').limitToLast(100)
    },
    computed: {
      descTracks: function () {
        return this.tracks.slice().reverse()
      }
    }
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    h1, h2 {
      font-weight: normal;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      display: inline-block;
      margin: 0 10px;
    }
    .card {
      position:relative;
    }

    .card:hover .hover-btn {
      display:block;
    }
    .hover-btn {
      position:absolute;
      text-align:center;
      width:100%;
      margin-top:20px;
      top:0;
      display:none;
    }
    .btn-primary {
      background-color: #42b983;
      border-color: #42b983;
    }
    table {
      margin-bottom: 0;
    }
  </style>
