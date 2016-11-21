<template>
  <div class="tracklist">


    <div class="row" id="filter">
      <div class="col-md-12">
        <form>

          <div class="form-group orderby">
            <label for="orderBy">Order by: </label>
            <select class="custom-select" id="orderBy" v-model="orderBy">
              <option value="F">Most Played (ever)</option>
              <option value="I">Most Played (recently)</option>
              <option value="G">Most Ratings</option>
              <option value="H">Best Rating</option>
            </select>  
          </div>

          <div class="form-group filter filter--type">
            Platform:
            <template v-for="filter in availableFiltersPlattform">
              <input type="checkbox" :id="filter" :value="filter" v-model="filterTrackPlattform">
              <label :for="filter">{{ filter }}</label>  
            </template>
          </div>


          <div class="form-group filter filter--type">
            Type:
            <template v-for="filter in availableFiltersType">
              <input type="checkbox" :id="filter" :value="filter" v-model="filterTrackTypes">
              <label :for="filter">{{ filter }}</label>  
            </template>
          </div>

          <div class="form-group filter filter--style">
            Style:
            <template v-for="filter in availableFiltersStyle">
              <input type="checkbox" :id="filter" :value="filter" v-model="filterTrackStyles">
              <label :for="filter">{{ filter }}</label>  
            </template>
          </div>

          <div class="form-group filter filter--length">
            Length:
            <template v-for="filter in availableFiltersLengths">
              <input type="checkbox" :id="filter" :value="filter" v-model="filterTrackLengths">
              <label :for="filter">{{ filter }}</label>  
            </template>
          </div>

        </form>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12">
       <div class="alert alert-info" v-if="loadingTracks">
         <strong>Loading Track Data</strong>  This may take a while
       </div>
     </div>
   </div>


   <div class="row" id="tracklist">
    <div class="col-md-3 col-xs-6" v-for="track in tracks">
      <div class="card thumbnail">
        <div class="hover-btn">
          <a :href="'https://players.turbo.trackmania.com' + track.url" class="btn btn-primary btn-sm" target="_blank">Open</a>
          <a :href="'https://players.turbo.trackmania.com/' + track.plattform + '/maps/favorites/' + track.url.split('/').pop() + '/add'" class=" btn btn-primary   btn-sm" target="_blank">Add to Favorites</a>
        </div>
        <img class="card-img-top img-fluid" :src="track.img" :alt="track.name">

        <div class="card-block text-xs-center">
          <h4 class="card-title">{{ track.name }} – <span class="tag tag-success">{{ track.plattform }}</span></h4>
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
                <td>{{ track.plays }}</td>
              </tr>
              <tr>
                <th scope="row">Recent</th>
                <td>{{ track.playsdiff }}</td>
              </tr>
              <tr>
                <th scope="row">Votes</th>
                <td>{{ track.ratings }}</td>
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
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
  </div> 


</div>
</template>

<script>
  // eslint-disable indent
  import Sheetrock from 'sheetrock'
  import InfiniteLoading from 'vue-infinite-loading'

  Sheetrock.defaults.url = 'https://docs.google.com/spreadsheets/d/14ijhDhUVFCalOFVCzrBaGLuCkBS_JV_AKzu4k7IsfMc/edit#gid=0'

  export default {
    name: 'Tracklist',
    components: {
      InfiniteLoading
    },
    data () {
      return {
        // Example Tracks
        orderBy: 'F', // F: Plays, G: Ratings, H: Rating

        // Type Filter
        filterTrackPlattform: ['ps4'],
        availableFiltersPlattform: ['ps4', 'xb1', 'pc'],

        // Type Filter
        filterTrackTypes: [],
        availableFiltersType: ['Canyon', 'Valley', 'Lagoon', 'Stadium'],

        // Style Filter
        filterTrackStyles: [],
        availableFiltersStyle: ['Race', 'Tech', 'LOL', 'Fullspeed', 'Platform', 'Offroad', 'Trial', 'Concept', 'Full Throttle', 'Smash', 'Stunts', 'Random', 'Bonus'],

        // Length Filter
        filterTrackLengths: [],
        availableFiltersLengths: ['Mini', 'Short', 'Normal', 'Long', 'Multi-lap'],

        loadingTracks: false,
        resetTracksAfterLoad: true,
        nextQuery: false,

        /* eslint-disable */
        /* Some Tracks to show without hitting The Spreadshit*/
        tracks: [{"trackid":"yusZ67iAoywrdLWZWrBbcwRmmr","name":"#0","type":"Canyon","style":"Stunts","length":"Long","plays":"83174","ratings":"20781","rating":"3,5","time1":"2:53.200","time2":"3:04.000","time3":"3:28.000","author":"inyourgsicht","authorid":"gebizigi-ps456ebcc0d64c73","url":"/ps4/maps/yusZ67iAoywrdLWZWrBbcwRmmr","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/yusZ67iAoywrdLWZWrBbcwRmmr.jpg"},{"trackid":"cjW23CRMdZlvsTg1ReKioOYGwXd","name":"#3","type":"Canyon","style":"Stunts","length":"Long","plays":"81696","ratings":"20362","rating":"4","time1":"2:21.427","time2":"2:30.000","time3":"2:50.000","author":"inyourgsicht","authorid":"gebizigi-ps456ebcc0d64c73","url":"/ps4/maps/cjW23CRMdZlvsTg1ReKioOYGwXd","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/cjW23CRMdZlvsTg1ReKioOYGwXd.jpg"},{"trackid":"mnjsyhEbvcphqndyWjvy4s4vIEm","name":"#2","type":"Canyon","style":"Stunts","length":"Long","plays":"79090","ratings":"20119","rating":"4","time1":"1:49.440","time2":"1:57.000","time3":"2:12.000","author":"inyourgsicht","authorid":"gebizigi-ps456ebcc0d64c73","url":"/ps4/maps/mnjsyhEbvcphqndyWjvy4s4vIEm","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/mnjsyhEbvcphqndyWjvy4s4vIEm.jpg"},{"trackid":"SM1yaBE2dh_riQka1Gd3hd3who2","name":"#1","type":"Canyon","style":"Stunts","length":"Long","plays":"76322","ratings":"19243","rating":"3,5","time1":"2:17.488","time2":"2:26.000","time3":"2:45.000","author":"inyourgsicht","authorid":"gebizigi-ps456ebcc0d64c73","url":"/ps4/maps/SM1yaBE2dh_riQka1Gd3hd3who2","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/SM1yaBE2dh_riQka1Gd3hd3who2.jpg"},{"trackid":"NLclGNRill_FWtITIYsvrNbzcW8","name":"#7","type":"Canyon","style":"Stunts","length":"Long","plays":"51517","ratings":"13665","rating":"4","time1":"4:17.530","time2":"4:33.000","time3":"5:10.000","author":"creddy777","authorid":"mamygemu-ps456ec59405b845","url":"/ps4/maps/NLclGNRill_FWtITIYsvrNbzcW8","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/NLclGNRill_FWtITIYsvrNbzcW8.jpg"},{"trackid":"2r2y5RV2gGF2zMSARlKVr4FobQb","name":"#5","type":"Canyon","style":"Stunts","length":"Long","plays":"50571","ratings":"13435","rating":"4","time1":"3:06.660","time2":"3:18.000","time3":"3:44.000","author":"creddy777","authorid":"mamygemu-ps456ec59405b845","url":"/ps4/maps/2r2y5RV2gGF2zMSARlKVr4FobQb","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/2r2y5RV2gGF2zMSARlKVr4FobQb.jpg"},{"trackid":"Nt7iJO4FT7Me358vJYo5fVDvjzf","name":"#4","type":"Canyon","style":"Stunts","length":"Long","plays":"49862","ratings":"13305","rating":"4","time1":"4:37.886","time2":"4:55.000","time3":"5:34.000","author":"creddy777","authorid":"mamygemu-ps456ec59405b845","url":"/ps4/maps/Nt7iJO4FT7Me358vJYo5fVDvjzf","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/Nt7iJO4FT7Me358vJYo5fVDvjzf.jpg"},{"trackid":"HKAc4MqvXc0weEy9IXxQcH8sxo","name":"#8","type":"Canyon","style":"Stunts","length":"Long","plays":"46204","ratings":"12346","rating":"4","time1":"2:59.361","time2":"3:11.000","time3":"3:36.000","author":"creddy777","authorid":"mamygemu-ps456ec59405b845","url":"/ps4/maps/HKAc4MqvXc0weEy9IXxQcH8sxo","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/HKAc4MqvXc0weEy9IXxQcH8sxo.jpg"},{"trackid":"3AcTOQqhc6M1UYjQPjPWU5tSwz0","name":"#6","type":"Canyon","style":"Stunts","length":"Long","plays":"46098","ratings":"12344","rating":"4","time1":"3:46.344","time2":"4:00.000","time3":"4:32.000","author":"creddy777","authorid":"mamygemu-ps456ec59405b845","url":"/ps4/maps/3AcTOQqhc6M1UYjQPjPWU5tSwz0","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/3AcTOQqhc6M1UYjQPjPWU5tSwz0.jpg"},{"trackid":"DuaArdPd1qlxQPUAdykc6i_ukif","name":"#11","type":"Canyon","style":"Stunts","length":"Long","plays":"45003","ratings":"11677","rating":"4","time1":"2:32.974","time2":"2:43.000","time3":"3:04.000","author":"creddy777","authorid":"mamygemu-ps456ec59405b845","url":"/ps4/maps/DuaArdPd1qlxQPUAdykc6i_ukif","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/DuaArdPd1qlxQPUAdykc6i_ukif.jpg"},{"trackid":"V0ojOkWwgrLnObUa4iR8by3X1l1","name":"#10","type":"Canyon","style":"Stunts","length":"Long","plays":"44428","ratings":"11880","rating":"4","time1":"4:23.077","time2":"4:39.000","time3":"5:16.000","author":"creddy777","authorid":"mamygemu-ps456ec59405b845","url":"/ps4/maps/V0ojOkWwgrLnObUa4iR8by3X1l1","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/V0ojOkWwgrLnObUa4iR8by3X1l1.jpg"},{"trackid":"K7Z_izoPdADOKBCv49RvnROqw0m","name":"#12","type":"Canyon","style":"Stunts","length":"Long","plays":"40774","ratings":"11037","rating":"4","time1":"3:10.138","time2":"3:22.000","time3":"3:49.000","author":"creddy777","authorid":"mamygemu-ps456ec59405b845","url":"/ps4/maps/K7Z_izoPdADOKBCv49RvnROqw0m","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/K7Z_izoPdADOKBCv49RvnROqw0m.jpg"},{"trackid":"2s7Ed53Vj43KbCk8zVbt4d0Gr9i","name":"#3","type":"Canyon","style":"Stunts","length":"Long","plays":"39743","ratings":"10558","rating":"3,5","time1":"4:35.623","time2":"4:53.000","time3":"5:31.000","author":"inyourgsicht","authorid":"gebizigi-ps456ebcc0d64c73","url":"/ps4/maps/2s7Ed53Vj43KbCk8zVbt4d0Gr9i","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/2s7Ed53Vj43KbCk8zVbt4d0Gr9i.jpg"},{"trackid":"vBg54AhLsprCM3fAYCngAeSfy9e","name":"#13","type":"Canyon","style":"Stunts","length":"Long","plays":"35891","ratings":"9108","rating":"4","time1":"3:01.832","time2":"3:13.000","time3":"3:39.000","author":"creddy777","authorid":"mamygemu-ps456ec59405b845","url":"/ps4/maps/vBg54AhLsprCM3fAYCngAeSfy9e","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/vBg54AhLsprCM3fAYCngAeSfy9e.jpg"},{"trackid":"ZmRRriLWwW2VHvqZ3lCLFrgET5b","name":"#14","type":"Canyon","style":"Stunts","length":"Long","plays":"33035","ratings":"9077","rating":"4","time1":"4:33.943","time2":"4:51.000","time3":"5:29.000","author":"creddy777","authorid":"mamygemu-ps456ec59405b845","url":"/ps4/maps/ZmRRriLWwW2VHvqZ3lCLFrgET5b","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/ZmRRriLWwW2VHvqZ3lCLFrgET5b.jpg"},{"trackid":"AdJf5K5lLOQiWJjF8spPW9UpCwb","name":"#15","type":"Canyon","style":"Stunts","length":"Long","plays":"30074","ratings":"8232","rating":"4","time1":"3:09.693","time2":"3:22.000","time3":"3:48.000","author":"creddy777","authorid":"mamygemu-ps456ec59405b845","url":"/ps4/maps/AdJf5K5lLOQiWJjF8spPW9UpCwb","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/AdJf5K5lLOQiWJjF8spPW9UpCwb.jpg"},{"trackid":"KLLmiC4jH0ST5VrCB6TNcqIAC1i","name":"#94","type":"Canyon","style":"Stunts","length":"Long","plays":"27947","ratings":"6889","rating":"4","time1":"2:45.287","time2":"2:56.000","time3":"3:19.000","author":"SnowHermit","authorid":"kahyqixo-ps45759321b34610","url":"/ps4/maps/KLLmiC4jH0ST5VrCB6TNcqIAC1i","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/KLLmiC4jH0ST5VrCB6TNcqIAC1i.jpg"},{"trackid":"LyB3dgBh0KrYBXupJGuUSNXfuLk","name":"#16","type":"Canyon","style":"Stunts","length":"Long","plays":"27823","ratings":"8002","rating":"4","time1":"4:00.311","time2":"4:15.000","time3":"4:49.000","author":"creddy777","authorid":"mamygemu-ps456ec59405b845","url":"/ps4/maps/LyB3dgBh0KrYBXupJGuUSNXfuLk","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/LyB3dgBh0KrYBXupJGuUSNXfuLk.jpg"},{"trackid":"wZDRteQDp8kBtdcqWPKmUXGaPu9","name":"#6","type":"Canyon","style":"Stunts","length":"Long","plays":"27403","ratings":"8001","rating":"4","time1":"4:36.494","time2":"4:54.000","time3":"5:32.000","author":"SpaceCorruption","authorid":"wuxaluvi-ps4572556741929a","url":"/ps4/maps/wZDRteQDp8kBtdcqWPKmUXGaPu9","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/wZDRteQDp8kBtdcqWPKmUXGaPu9.jpg"},{"trackid":"m9KKcBszMPgciLhRmugG49Ek9Wc","name":"#100","type":"Canyon","style":"Stunts","length":"Long","plays":"27053","ratings":"6660","rating":"4","time1":"2:15.900","time2":"2:25.000","time3":"2:44.000","author":"SnowHermit","authorid":"kahyqixo-ps45759321b34610","url":"/ps4/maps/m9KKcBszMPgciLhRmugG49Ek9Wc","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/m9KKcBszMPgciLhRmugG49Ek9Wc.jpg"},{"trackid":"TxhTSXkWaQUXTUZxV9BQVoMNHKf","name":"#99","type":"Canyon","style":"Stunts","length":"Long","plays":"26913","ratings":"7082","rating":"4","time1":"2:17.466","time2":"2:26.000","time3":"2:45.000","author":"SnowHermit","authorid":"kahyqixo-ps45759321b34610","url":"/ps4/maps/TxhTSXkWaQUXTUZxV9BQVoMNHKf","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/TxhTSXkWaQUXTUZxV9BQVoMNHKf.jpg"},{"trackid":"JpaPm91tLJEgoeKtBxuv6DmP2Eh","name":"#16","type":"Canyon","style":"Stunts","length":"Long","plays":"26399","ratings":"7902","rating":"4","time1":"1:30.542","time2":"1:36.000","time3":"1:49.000","author":"SpaceCorruption","authorid":"wuxaluvi-ps4572556741929a","url":"/ps4/maps/JpaPm91tLJEgoeKtBxuv6DmP2Eh","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/JpaPm91tLJEgoeKtBxuv6DmP2Eh.jpg"},{"trackid":"lnJnPLfqqsIVd_MDrdBL0QeynEf","name":"#14","type":"Canyon","style":"Stunts","length":"Long","plays":"26384","ratings":"7372","rating":"3,5","time1":"1:45.462","time2":"1:52.000","time3":"2:07.000","author":"SpaceCorruption","authorid":"wuxaluvi-ps4572556741929a","url":"/ps4/maps/lnJnPLfqqsIVd_MDrdBL0QeynEf","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/lnJnPLfqqsIVd_MDrdBL0QeynEf.jpg"},{"trackid":"hHJRVacXhDdxFjmDAROuEPJDml0","name":"#97","type":"Canyon","style":"Stunts","length":"Long","plays":"25994","ratings":"6668","rating":"4","time1":"3:22.828","time2":"3:35.000","time3":"4:04.000","author":"SnowHermit","authorid":"kahyqixo-ps45759321b34610","url":"/ps4/maps/hHJRVacXhDdxFjmDAROuEPJDml0","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/hHJRVacXhDdxFjmDAROuEPJDml0.jpg"},{"trackid":"R9iRBUE7k12GD65OgcYBkihBh5h","name":"#11","type":"Canyon","style":"Stunts","length":"Long","plays":"25950","ratings":"7779","rating":"4","time1":"2:42.675","time2":"2:53.000","time3":"3:16.000","author":"SpaceCorruption","authorid":"wuxaluvi-ps4572556741929a","url":"/ps4/maps/R9iRBUE7k12GD65OgcYBkihBh5h","img":"https://s3-eu-west-1.amazonaws.com/tmturbo-prod-ps4-maps/R9iRBUE7k12GD65OgcYBkihBh5h.jpg"}]
        /* eslint-enable */
      }
    },
    computed: {
      whereQuery: function () {
        let whereString = ''

        // Dont use if filter if none or all are selected (too speed up Query)
        if (this.filterTrackTypes.length && this.filterTrackTypes.length !== this.availableFiltersType.length) {
          // If this is the first Filter Add the WHERE Clause t
          if (whereString.length === 0) {
            whereString = 'WHERE '
          } else {
            whereString += ' AND '
          }

          let queryString = '(C=\''
          queryString += this.filterTrackTypes.join('\' or C=\'')
          queryString += '\')'
          whereString += queryString
        }

        if (this.filterTrackStyles.length && this.filterTrackStyles.length !== this.availableFiltersStyle.length) {
          // If this is the first Filter Add the WHERE Clause t
          if (whereString.length === 0) {
            whereString = 'WHERE '
          } else {
            whereString += ' AND '
          }

          let queryString = '(D=\''
          queryString += this.filterTrackStyles.join('\' or D=\'')
          queryString += '\')'
          whereString += queryString
        }

        if (this.filterTrackLengths.length && this.filterTrackLengths.length !== this.availableFiltersLengths.length) {
          // If this is the first Filter Add the WHERE Clause t
          if (whereString.length === 0) {
            whereString = 'WHERE '
          } else {
            whereString += ' AND '
          }

          let queryString = '(E=\''
          queryString += this.filterTrackLengths.join('\' or E=\'')
          queryString += '\')'
          whereString += queryString
        }

        if (this.filterTrackPlattform.length && this.filterTrackPlattform.length !== this.availableFiltersPlattform.length) {
          // If this is the first Filter Add the WHERE Clause t
          if (whereString.length === 0) {
            whereString = 'WHERE '
          } else {
            whereString += ' AND '
          }

          let queryString = '(L=\''
          queryString += this.filterTrackPlattform.join('\' or L=\'')
          queryString += '\')'
          whereString += queryString
        }

        console.log(whereString)

        if (whereString !== null) {
          return whereString
        } else {
          return ''
        }
      }
    },
    created: function () {
      console.log('created tracklist')
      // Set default URL for Sheetrock
      Sheetrock.defaults.url = 'https://docs.google.com/spreadsheets/d/1pBUCQIGKxkbPcxHD4RXvHGUx5MXn-3tTpO9Rb-V7mN0/edit#gid=0'
      this.querySheet()
    },
    watch: {
      'orderBy': function () {
        this.filterHasChanged()
      },
      'filterTrackPlattform': function () {
        this.filterHasChanged()
      },
      'filterTrackTypes': function () {
        this.filterHasChanged()
      },
      'filterTrackStyles': function () {
        this.filterHasChanged()
      },
      'filterTrackLengths': function () {
        this.filterHasChanged()
      }
    },
    methods: {
      // With no parameters this will end up catching all Columns Ordered by Plays (F)
      // Limited to 25 Tracks
      //
      // use query param to overwrite the query
      // eg. this.querySheet('select A,B,C,D,E,F,G,H,I,J,K,L,M order by A desc')
      //
      // use params param to ovewrite defaults or add addional options
      // eg. this.querySheet(undefined, {fetchSize: 100})
      //
      // see https://github.com/chriszarate/sheetrock for options
      // And https://developers.google.com/chart/interactive/docs/querylanguage
      // for query language
      // Sheetrock implements lazy loading. It rembers the last row
      // and will continue from there. Use reset() to start all over
      //
      querySheet: function (query, params) {
        // if we are currently busy loading Tracks, defer the query overwriting an existing deferred query
        if (this.loadingTracks) {
          this.nextQuery = {
            query: query,
            params: params,
            reset: this.resetTracksAfterLoad
          }
          console.log('deferring', query, params)
          return true
        } else {
          console.log('deleting nextQuery')
          this.nextQuery = false
        }

        this.loadingTracks = true

        let defaultParams = {
          query: query === undefined ? 'select A,B,C,D,E,F,G,H,I,J,K,L ' + this.whereQuery + ' order by ' + this.orderBy + ' desc' : query,
          fetchSize: 20,
          callback: this.sheetRockDataCallback
        }

        let finalParams = defaultParams

        for (var key in params) {
          // If the current property wasn't inherited, proceed
          if (params.hasOwnProperty(key)) {
            // If the current property is defined,
            // add it to finalParams
            if (params[key] !== undefined) {
              finalParams[key] = params[key]
            }
          }
        }

        console.log('Sheetrock Query: ', finalParams)

        Sheetrock(finalParams)
      },
      sheetRockDataCallback: function (error, options, response) {
        console.log('sheetRockDataCallback')

        if (!error) {
          console.log(response.rows)
          // Empty Tracks if wanted

          if (this.resetTracksAfterLoad) {
            this.tracks = []
            this.resetTracksAfterLoad = false
          }

          let arrayLength = response.rows.length
          for (var i = 0; i < arrayLength; i++) {
            let track = response.rows[i].cells
            if (track.trackid === 'trackid') {
              continue
            }
            track.url = '/' + track.plattform + '/maps/' + track.trackid
            track.img = 'https://s3-eu-west-1.amazonaws.com/tmturbo-prod-' + track.plattform + '-maps/' + track.trackid + '.jpg'
            this.tracks.push(track)
          }
        } else {
          console.log(error)
        }

        this.loadingTracks = false
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        // Start loading a deferred query if it exists
        if (this.nextQuery !== false) {
          this.resetTracksAfterLoad = this.nextQuery.reset
          this.querySheet(this.nextQuery.query, this.nextQuery.params)
          console.log('nextQuery !== false')
        }
      },
      filterHasChanged () {
        console.log('Changed Filter')
        this.resetTracksAfterLoad = true
        this.querySheet(undefined, {reset: true})
      },
      onInfinite () {
        console.log('Infinite-scroll triggerd')
        if (this.loadingTracks === false) {
          this.querySheet()
        } else {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  #filter label{

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

  .card:hover .hover-btn, .card:focus .hover-btn{
    display:block;
  }


  .filter{

  }


  .filter label{
    background-color: #fff;
    color:#5bc0de;
    border:1px solid #5bc0de;
    padding:4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    cursor: pointer;
  }

  .filter input {
    display: none;
  }
  input[type="checkbox"]:checked + label {
    background-color: #5bc0de;
    color:#fff;
  }
  #tracklist {
    margin-top:20px;
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
