/*
The Cow

by Ivana Stojadinovic contact[at]ivanaweb[dot]com

Cow chat simulator in which the cow randomly alternates 
between mooing and 'thinking' images related to the user's latest 'IM'.
*/

var randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

keyword = {
    /* 
    getKeyword() accepts a string (sentence), 
    strips it of stopwords (non-content words)
    returns a keyword string
    stopword list from http://members.unine.ch/jacques.savoy/clef/englishST.txt
    */
    stopwords   : ["a", "a's", "able", "about", "above", "according", "accordingly", "across", "actually", "after", "afterwards", "again", "against", "ain't", "all", "allow", "allows", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "an", "and", "another", "any", "anybody", "anyhow", "anyone", "anything", "anyway", "anyways", "anywhere", "apart", "appear", "appreciate", "appropriate", "are", "aren't", "around", "as", "aside", "ask", "asking", "associated", "at", "available", "away", "awfully", "b", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "believe", "below", "beside", "besides", "best", "better", "between", "beyond", "both", "brief", "but", "by", "c", "c'mon", "c's", "came", "can", "can't", "cannot", "cant", "cause", "causes", "certain", "certainly", "changes", "clearly", "co", "com", "come", "comes", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", "corresponding", "could", "couldn't", "course", "currently", "d", "definitely", "described", "despite", "did", "didn't", "different", "do", "does", "doesn't", "doing", "don't", "done", "down", "downwards", "during", "e", "each", "edu", "eg", "eight", "either", "else", "elsewhere", "enough", "entirely", "especially", "et", "etc", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "exactly", "example", "except", "f", "far", "few", "fifth", "first", "five", "followed", "following", "follows", "for", "former", "formerly", "forth", "four", "from", "further", "furthermore", "g", "get", "gets", "getting", "given", "gives", "go", "goes", "going", "gone", "got", "gotten", "greetings", "h", "had", "hadn't", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "he's", "hello", "help", "hence", "her", "here", "here's", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "hey", "hi", "him", "himself", "his", "hither", "hopefully", "how", "howbeit", "however", "i", "i'd", "i'll", "i'm", "i've", "ie", "if", "ignored", "immediate", "in", "inasmuch", "inc", "indeed", "indicate", "indicated", "indicates", "inner", "insofar", "instead", "into", "inward", "is", "isn't", "it", "it'd", "it'll", "it's", "its", "itself", "j", "just", "k", "keep", "keeps", "kept", "know", "knows", "known", "knew", "l", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "let's", "like", "liked", "likely", "little", "look", "looking", "looks", "ltd", "m", "mainly", "many", "may", "maybe", "me", "mean", "meanwhile", "merely", "might", "more", "moreover", "most", "mostly", "much", "must", "my", "myself", "n", "name", "namely", "nd", "near", "nearly", "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", "nine", "no", "nobody", "non", "none", "noone", "nor", "normally", "not", "nothing", "novel", "now", "nowhere", "o", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "on", "once", "one", "ones", "only", "onto", "or", "other", "others", "otherwise", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "own", "p", "particular", "particularly", "per", "perhaps", "placed", "please", "plus", "possible", "presumably", "probably", "provides", "q", "que", "quite", "qv", "r", "rather", "rd", "re", "really", "reasonably", "regarding", "regardless", "regards", "relatively", "respectively", "right", "s", "said", "same", "saw", "say", "saying", "says", "second", "secondly", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sensible", "sent", "serious", "seriously", "seven", "several", "shall", "she", "should", "shouldn't", "since", "six", "so", "some", "somebody", "somehow", "someone", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specified", "specify", "specifying", "still", "sub", "such", "sup", "sure", "t", "t's", "take", "taken", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that's", "thats", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "there's", "thereafter", "thereby", "therefore", "therein", "theres", "thereupon", "these", "they", "they'd", "they'll", "they're", "they've", "think", "third", "this", "thorough", "thoroughly", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "twice", "two", "u", "un", "under", "unfortunately", "unless", "unlikely", "until", "unto", "up", "upon", "us", "use", "used", "useful", "uses", "using", "usually", "uucp", "v", "value", "various", "very", "via", "viz", "vs", "w", "want", "wants", "was", "wasn't", "way", "we", "we'd", "we'll", "we're", "we've", "welcome", "well", "went", "were", "weren't", "what", "what's", "whatever", "when", "whence", "whenever", "where", "where's", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "who's", "whoever", "whole", "whom", "whose", "why", "will", "willing", "wish", "with", "within", "without", "won't", "wonder", "would", "would", "wouldn't", "x", "y", "yes", "yet", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves", "z", "zero"],
    getKeyword  : function(userInput) {
                    // turn the input into an array of words
                    var sentence    = userInput.split(" ");
                    var keywordList = [];
                    var wordIndex, word;

                    // get rid of stopwords
                    for ( i=0; i < sentence.length; i++ ) {
                        // remove punctuation marks
                        sentence[i] = sentence[i].replace(/[\.\,\?!\s]/g, "");
                        // make it lowercase
                        sentence[i] = sentence[i].toLowerCase();
                        // if the word isn't a stopword, add it to the keywordList
                        if ( !(this.stopwords.indexOf(sentence[i]) > -1) ) {
                            keywordList.push(sentence[i]);
                        }
                    }
                    
                    // if there's more than one keyword, pick a random one
                    if ( keywordList.length > 1 ) {
                        wordIndex = randomInt(0, keywordList.length);
                        word = keywordList[wordIndex];
                    // if there are none
                    } else if ( keywordList.length == 0 ) {
                        var muchWords = ["cow", "chocolate", "cute", "lol", "funny", "reaction", "trip", "cows", "high", "garden", "batman", "model", "fashion", "makeup", "moon", "grass", "india", "temple", "flower", "flowers", "moo", "ballet", "manatee", "prince"];
                        wordIndex = randomInt(0, muchWords.length);
                        word = muchWords[wordIndex];
                    } else {
                        word = keywordList[0];
                    }

                    // sing it back, bring it back, sing it back, sing it back to me
                    return word;
                }
};

var moo = {
    /*
    getMoo() makes a random phrase in cow language (just go with it)
    returns a span element that contains the 'Moo' statement
    */

    // get a string with a random number of "o"s
    oos          : function () {
                    var o       = "o";
                    var number  = randomInt(1, 10);
                    while ( number > 0 ) {
                        o += "o";
                        number --;
                    }
                    return o;
                },
    // get a random punctuation mark out of the array
    punctuation :  function () {
                    var marks   = [".", "...", "?", "!"];
                    var index   = randomInt(0, marks.length);
                    return marks[index];
                },
    // return the phrase
    getMoo      : function (callback) {
                    var wrapper = document.createElement("span");
                    var moo = "M" + this.oos() + this.punctuation();
                    wrapper.innerHTML = moo;
                    if ( typeof callback === "function") {
                        callback(wrapper);
                    }
                }
};

var image = {
    /*
    getImg() accepts a keyword string
    uses imgur.com API to get an image tagged with the keyword
    returns an image element with src set to imgur image url
    */
    request : new XMLHttpRequest(),
    setUrl  : function (tag) {
                var urlBase = 'https://api.imgur.com/3/gallery/t/';
                var url     = urlBase + tag + '/';
                return url;
            },
    getImg  : function (keyword, callback) {
                var reqRef = this.request;
                var apiUrl = this.setUrl(keyword);
                reqRef.open('GET', apiUrl, true);
                reqRef.setRequestHeader('Authorization', 'Client-ID 10fd971891b50f3');
                reqRef.setRequestHeader('Content-Type', 'application/json');
                reqRef.onreadystatechange = function (evtXHR) {
                    var url;
                    var wrapper;
                    if (reqRef.readyState == 4) {
                        if (reqRef.status == 200) {

                            var response = JSON.parse(reqRef.responseText);
                            // if the response isn't an empty json
                            if ( response.data.name != "undefined" ) {

                                // it returns images and albums on the same level, so:
                                var index = randomInt(0, response.data.items.length);
                                while ( response.data.items[index].is_album == true ) {
                                    index = randomInt(0, response.data.items.length);
                                }
                                url = response.data.items[index].link;
                                wrapper = document.createElement("img");
                                wrapper.src = url;

                            // else if the keyword isn't an existing imgur tag,
                            // and so returns valid, but empty json
                            } else {
                                moo.getMoo(function(cowStmt) {
                                    setTimeout(function() {
                                        cowBubble.appendChild(cowStmt);
                                        document.getElementById("userInput").disabled = false;
                                    }, 500);
                                });
                            }

                            if ( typeof callback === "function") {
                                callback(wrapper);
                            }

                        } else {
                        // console.log("request Errors Occured " + reqRef.readyState + " and the status is " + reqRef.status);
                            moo.getMoo(function(cowStmt) {
                                setTimeout(function() {
                                    console.log(cowStmt.innerHTML);
                                    cowBubble.appendChild(cowStmt);
                                    document.getElementById("userInput").disabled = false;
                                }, 500);
                            });
                        }
                    } else {
                        dump("currently the application is at" + reqRef.readyState);
                    }
                };
                reqRef.send(null);
            }
};

var chat = {
    /*
    1. init()s with the cow's 'Moo'
    2. lets user respond
    3. grabs user input
    4.a randomly chooses between mooing again and 
    4.b 1) parsing user input for keywords
        2) searching imgur.com for images tagged with said keyword
        3) showing the image in the cow's bubble
    5. repeats from 2.
    */
    userActive      : false,
    cowBubble       : document.getElementById("cowBubble"),
    userBubble      : document.getElementById("userBubble"),
    userInput       : document.getElementById("userInput"),
    clear           : function (element) {
                        if ( element.firstChild ) {
                            element.removeChild(element.firstChild);
                        } else if ( element.tagName.toLowerCase() == "input" ) {
                            element.value = "";
                        } else {
                            element.innerHTML = "";
                        }
                    },
    postUserStmt   : function () {
                            var userStmt = this.userInput.value;
                            this.userBubble.innerHTML = userStmt;
                            this.userBubble.style.display = "block";
                            this.clear(this.userInput);
                            this.userInput.disabled = true;
                            this.postCowStmt(userStmt);
                            return false;
                    },
    postCowStmt      : function (userStmt) {
                        var statement;
                        var cowBubble = this.cowBubble;
                        var userInput = userStmt;
                        var dice      = randomInt(1,3); // roll to decide whether to show and image or moo

                        this.clear(cowBubble);
                        
                        if ( dice == 1 ) { // Moo
                            statement = moo.getMoo(function(cowStmt) {
                                setTimeout(function() {
                                    cowBubble.appendChild(cowStmt);
                                    document.getElementById("userInput").disabled = false;
                                }, 500);
                            });
                        } else { // Image
                            var word = keyword.getKeyword(userInput);
                            statement = image.getImg(word, function(cowStmt) {
                                setTimeout(function() {
                                    cowBubble.appendChild(cowStmt);
                                    document.getElementById("userInput").disabled = false;
                                }, 500);
                            });
                        }
                    },
    init            : function () {
                        moo.getMoo(function(cowStmt) {
                            cowBubble.appendChild(cowStmt);
                            this.userInput.disabled = false;
                            this.userInput.focus();
                        });
                    }
};

chat.init();