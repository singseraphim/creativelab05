var app = new Vue({
  el: '#app',
  data: {
    addedContent: '',
    letters: [],
  },
  created: function() {
    this.getLetters();
  },
  methods: {
    getLetters: function() {
      axios.get("http://localhost:3000/api/letters").then(response => {
	this.letters = response.data;
	return true;
      }).catch(err => {
      });
    },
    addLetter: function() {
      axios.post("http://localhost:3000/api/letters", {
	content: this.addedContent,
      }).then(response => {
	this.addedContent = "";
	this.getLetters();
	return true;
      }).catch(err => {
      });
    },
    deleteLetter: function(letter) {
      axios.delete("http://localhost:3000/api/letters/" + letter.id).then(response => {
	this.getLetters();
	return true;
      }).catch(err => {
      });
    },
  }
});