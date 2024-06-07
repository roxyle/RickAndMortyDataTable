
//setto come voglio vedere la data
const options = {year: 'numeric', month: 'short', day: 'numeric' };
var statusVar = "";

//quando la pagina è pronta
jQuery(function() {
  $('#searchable-select').niceSelect();
  $('#searchable-select2').niceSelect();

  var boxRicerca = document.getElementById("box-ricerca");

  //creo la nuova DataTable, come parametri metto id della table e come opzioni di config {}
  var table = new DataTable('#myTable', {

      //aggiungo "dom": 'lrtip' per eliminare il riquadro di selezione
      "dom": 'lrtip',
      //aggiungo select: true per abilitare la selezione delle righe da parte dell'utente
      select: true,
      //qui iniziano le impostazioni ajax-json
        ajax: {
            url: 'https://rickandmortyapi.com/api/character/',
          //all'ajax oltre all'url dal quale prendere il json passo dataSrc per dirgli quale porzione del json serve
            dataSrc: function (json) {
              var return_data = new Array();
              //ciclo il json per salvarmi soltanto la porzione che mi serve (in un array)
                for(var i=0;i< json.results.length; i++){
                  return_data.push({
                    'id'  : json.results[i].id,
                    'image': '<img src="' + json.results[i].image + '" alt="avatar personaggio" width="100" height="100">',
                    'name' : json.results[i].name,
                    'species': json.results[i].species,
                    'origin': json.results[i].origin.name,
              //la data la "parso" in LocaleDate passando come opzioni quelle a riga 2
                    'created': new Date(json.results[i].created).toLocaleDateString('it-IT', options),
                    'status': json.results[i].status,
                  }) 
                 }
                return return_data;
           },
            
               },
               language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/it-IT.json',
            },
        columns: [
               { data: 'id'},
               { data: 'image'},
               { data:  'name' },
               { data:  'species' },
               { data:  'origin' },
               { data:  'created' },
               { data:  'status' }
            ],
            createdRow: function (row, data, index) {
                  $(row).addClass("grid-item");
                  $(row).addClass(data['status']);
                  $(row).addClass(data['species'])
            },
            "columnDefs": [
              { "searchable": false, "targets": 0 },
              { "searchable": false, "targets": 1 },
              { "searchable": true, "targets": 2 },
              { "searchable": true, "targets": 3 },
              { "searchable": false, "targets": 4 },
              { "searchable": false, "targets": 5 },
              { "searchable": true, "targets": 6 },

            ],
            // "columnDefs": [ 
            //   // {
            //   //   searchPanes: {
            //   //       combiner: 'and'
            //   //   }},
            //   {
            //   "targets": -1,
            //   "createdCell": function (td, cellData, rowData, row, col) {
            //       $(td).addClass('stato')
            //   }
            // },
            // {
            //   "targets": -4,
            //   "createdCell": function (td, cellData, rowData, row, col) {
            //       $(td).addClass('specie')
            //   }
            // } ] // fine "columnDefs"
            
          }); //fine var table = new DataTable
       //inizio sezione per la ricerca



       let selettoreSpec = document.getElementById("searchable-select");
       let selettoreStat = document.getElementById("searchable-select2");

       
    selettoreSpec.onchange = function () {
      let valoriSpec = ""
      for( var option of selettoreSpec.options) {
        if (option.selected){
          valoriSpec += option.value+" ";
        }} // fine for
    console.log("valoriSpec "+valoriSpec)
    table.column(-4).search( valoriSpec ).draw();
  } //fine selettoreSpec.onchange

  selettoreStat.onchange = function () {
    let valoriStat = ""
    for( var option of selettoreStat.options) {
      if (option.selected){
        valoriStat += option.value+" ";
      }} // fine for
  console.log("valoriStat: "+valoriStat)
  table.column(-1).search( valoriStat ).draw();
  //return valori
} //fine selettoreStat.onchange


boxRicerca.onkeyup = function(){
  const input = document.querySelector('input[type="search"]');
  input.onsearch = () => {
    table.search(input.value).draw() ;
  };


}






}) //fine jQuery(function()
