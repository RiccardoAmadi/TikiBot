class Dice {
  
    constructor(command) {
      this.regex = /^(\d*)d(\d*)([+-]?)(\d*)$/;
      this.incrementalRegex = /^(\d*)d(\d*)(([+-]?)(\d*))*/;
      this.constPartRegex = /([+-])(\d*)/g;
      this.dicePartRegex = /([+-]?)(\d*)d(\d*)/g;
      this.singleRollRegex = /([+-]?)(\d*)d(\d*)/;
      this.singleConstantRegex = /([+-]?)(\d*)/;
      this.command = command;
      this.cleanedCommand = this.removeWhitespaces(command);
  
      this.diceNumber;
      this.diceSize;
      this.modifierSign;
      this.modifier;
      this.rolledDice = [];
      this.lastRoll;
      this.result = 0;
      this.isValid = false;
    }
  
    removeWhitespaces(string) {
      return string.replace(/\s/g, "");
    }
    
    printRollMessage() {
      var message = '```ini\n';
      message += '[' + this.result + ']\n';
      message += '\n';
      message += this.command;
      message += ' ';
      message += this.printRolled();
      
      if(this.diceSize == 20 && this.diceNumber == 1 && this.rolledDice[0] == 20) {
        message += '\n\n';
        message += '20 naturale!';
      }
      
      if(this.diceSize == 20 && this.diceNumber == 1 && this.rolledDice[0] == 1) {
        message += '\n\n';
        message += '1 di dado!';
      }
      
      message += '```';
      
      return message
    }
    
    printRollMessage2() {
      var message = '```ini\n';
      message += '[' + this.result + ']\t' + this.cleanedCommand + '\n';

      var element = this.rolledDice[0];
      
      message += '```';
      message += '```ml';

      for (let index = 0; index < this.rolledDice.length; index++) {
        
        element = this.rolledDice[index];

        message += '\n';
        message += 'd' + element[0];
        message += ' ';
        message += this.printRolled2(element[1]);
      }      
      
      message += '```';
      
      return message
    }
    
    validate2() {
      this.isValid = true;
      return this.isValid;
    }

    validate() {
      this.isValid = true;
      if (this.command.match(this.regex)) {
        this.isValid = true;
      }
      else {
        this.isValid = false;
      }
      return this.isValid;
    }
  
    parseDiceRollInput2() {

      var results = this.cleanedCommand.match(this.dicePartRegex);

      //ogni element è un addendo di lancio di dadi es. d20 o +4d6
      results.forEach(element => {
        this.parseSingleRollInput(element);
      });

      var tempCommand = this.cleanedCommand.replace(this.dicePartRegex, "");

      var constResults = tempCommand.match(this.constPartRegex);

      //ogni element è un addendo es. +2 o -15
      if(constResults !== null) {
        constResults.forEach(element => {
          this.sumSingleConstant(element);
        });
      }

    }
  
    parseSingleRollInput(command) {
      var results = command.match(this.singleRollRegex);
  
      var diceModifier = results[1];
      var diceNumber = results[2];
      if(diceNumber === '') {
        // d20 => 1d20
        diceNumber = 1;
      }
      var diceSize = results[3];
      var rolledDice = [];
        
      for(var i=0;i<diceNumber;i++) {
        var lastRoll = this.roll(diceSize);
        rolledDice[i] = lastRoll;
        if(diceModifier === '+' || diceModifier === '') {
          this.result += lastRoll;
        }
        if(diceModifier === '-') {
          this.result -= lastRoll;
        }
      }

      this.rolledDice[this.rolledDice.length] = [diceSize, rolledDice];
    }
  
    sumSingleConstant(command) {
      var results = command.match(this.singleConstantRegex);
  
      this.modifierSign = results[1];
      this.modifier = results[2];
  
      if(this.modifierSign === '+') {
        this.result += parseInt(this.modifier);
      }
      if(this.modifierSign === '-') {
        this.result -= parseInt(this.modifier);
      }
    }
  
    parseDiceRollInput() {
      var results = this.cleanedCommand.match(this.regex);
  
      this.diceNumber = results[1];
      if(this.diceNumber === '') {
        // d20 => 1d20
        this.diceNumber = 1;
      }
      this.diceSize = results[2];
      this.modifierSign = results[3];
      this.modifier = results[4];
  
      for(var i=0;i<this.diceNumber;i++) {
        this.lastRoll = this.roll(this.diceSize);
        this.rolledDice[i] = this.lastRoll;
        this.result += this.lastRoll;
      }
      if(this.modifierSign === '+') {
        this.result += parseInt(this.modifier);
      }
      if(this.modifierSign === '-') {
        this.result -= parseInt(this.modifier);
      }
    }
    
    printRolled() {
      var string = '( ';
      for(var i = 0; i < this.rolledDice.length;i++) {
        string += this.rolledDice[i];
        string += ' ';
      }
      string += ')';
      return string;
    }
    
    printRolled2(rolledDice) {
      var string = '( ';
      for(var i = 0; i < rolledDice.length;i++) {
        string += rolledDice[i];
        string += ' ';
      }
      string += ')';
      return string;
    }
  
    roll(string) {
        var randomNumber = Math.floor(Math.random() * string) + 1;
        return randomNumber;
    }
  }

  module.exports = Dice;