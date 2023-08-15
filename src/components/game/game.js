//modo inicial do jogo; a
let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,
  
    teachs: ['bootstrap', 'css', 'electron', 'firebase', 'html', 'javascript', 'jquery', 'mongo', 'node', 'react'],
    cards: null,
    //definir card;
    setCard: function (id) {
      //recebo um id e encontro o item;
      let card = this.cards.filter(card => card.id === id)[0];
      //se eu não tiver uma carta ou estiver em lockMode significa que que tem algo errado, pois so entra em lockMode após virar a segunda carta e para isto preciso da primeira carta;
      if (card.flipped || this.lockMode) {
        return false;
      }
      //se não tiver a primeira carta, defino ela como a primeira, se tiver ela ai defino como a segunda;
      if (!this.firstCard) {
        this.firstCard = card;
        this.firstCard.flipped = true;
        return true;
      } else {
        this.secondCard = card;
        this.secondCard.flipped = true;
        this.lockMode = true;
        return true;
      }
    },
    //checar se houve match;
    checkMatch: function () {
      if (!this.firstCard || !this.secondCard) {
        return false;
      }
      //aqui faço um return para receber true ou false;
      return this.firstCard.icon === this.secondCard.icon;
    },
    //limpar cards;
    clearCards: function () {
      this.firstCard = null;
      this.secondCard = null;
      this.lockMode = false;
    },
    //desvirar aos cards
    unflipCards: function () {
      this.firstCard.flipped = false;
      this.secondCard.flipped = false;
      this.clearCards();
    },
    //verifica se todos cards foram flipped;
    checkGameOver: function () {
      return this.cards.filter(card => !card.flipped).length === 0;
    },
    //criar o card das teachs;
    createCardFromTeachs: function () {
      this.cards = [];
  
      this.teachs.forEach(teach => {
        this.cards.push(...this.createPairFromTeach(teach));
      });
  
      this.shuffleCards();
      return this.cards;
    },
    //criar o pares das teachs;
    createPairFromTeach: function (teach) {
      return [{
        id: this.createIdWithTeach(teach),
        icon: teach,
        flipped: false
      }, {
        id: this.createIdWithTeach(teach),
        icon: teach,
        flipped: false
      }];
    },
    //criar o id para cada um das teachs
    createIdWithTeach: function (teach) {
      return teach + parseInt(Math.random() * 1000);
    },
    //embaralhar o card;
    shuffleCards: function () {
      let currentIndex = this.cards.length;
      let randomIndex = 0;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
      }
    }
  };
  
  export default game;
  