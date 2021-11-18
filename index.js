function balkanLeague(){
    const teams = ['Dinamo Zagreb','Red Star', 'Maribor', 'Olimpija Ljubljana', 'Hajduk Split', 'Rijeka',
                    'Partizan Beolgrade', 'Zrinski', 'Cluj', 'Levski', 'CSKA', 'BEsiktas', 'Galatasaray', 'Fenerbahce']
    
    for(let year = 2021; year <= 2051; year++){
    const randomTeam = teams[Math.floor(Math.random() * teams.length)]
    console.log(`Champion ${year} : ${randomTeam}`);
    }
}
balkanLeague();