const todos = [
    {id: '01', title: 'todo1' , rating: 1},
    {id: '02', title: 'todo2' , rating: 2},
    {id: '03', title: 'todo3' , rating: 3},
    {id: '04', title: 'todo4' , rating: 4},
    {id: '05', title: 'todo5' , rating: 5},
  ];

function compareSongs(s1, s2) {
return s2.rating - s1.rating;
}
  
  function todosSorted() {
    return [...todos].sort(compareSongs);
  }

export default {todosSorted};