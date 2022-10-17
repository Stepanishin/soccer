
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
        import {
          getFirestore,
          doc,
          getDoc,
          getDocs,
          onSnapshot,
          collection,
          query,
          where,
        } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyDuNQLibYRVZ3-IUn8zKQ54-uYqpu26Vy8",
          authDomain: "lazyrarity.firebaseapp.com",
          projectId: "lazyrarity",
          storageBucket: "lazyrarity.appspot.com",
          messagingSenderId: "58373460052",
          appId: "1:58373460052:web:926558eeb55f00bb1e9dc1",
          measurementId: "G-9XGVR90XP4",
        };
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore();
  
        async function searchToken(n) {
          var inputValue = document.getElementById("rarityCheckerInput");
          const tokensRef = collection(db, "tokens");
          let tokenNumber = n ? n : inputValue.value;
          const qu = query(
            tokensRef,
            where("tokenData.name", "==", "Lazy Alpha #" + tokenNumber)
          );
          const querySnapshotTokens2 = await getDocs(qu);
          let tokenData;
          querySnapshotTokens2.forEach((doc) => {
            tokenData = doc.data();
          });
  
          document.getElementsByClassName("statisticValue")[0].textContent =
            tokenData.rarityNumber;
  
          let traitsEl = document.getElementsByClassName("traits")[0];
          traitsEl.innerHTML = "";
  
          tokenData.metadata.attributes.forEach((attribute) => {
            var el = document.createElement("div");
            el.setAttribute("class", "trait");
            var firstChild = document.createElement("div");
            firstChild.setAttribute("class", "traitTitle");
            firstChild.textContent = attribute.trait_type;
            var secondChild = document.createElement("div");
            secondChild.setAttribute("class", "traitValue");
            secondChild.textContent = attribute.value;
  
            el.appendChild(firstChild);
            el.appendChild(secondChild);
            traitsEl.appendChild(el);
            var imageEl = document.getElementById("tokenImg");
            imageEl.setAttribute("src", tokenData.metadata.image);
  
            const setRarityMark = () => {
              if (tokenData.rarityNumber < 10) {
                return "Legendary";
              }
              if (tokenData.rarityNumber >= 10 && tokenData.rarityNumber <= 49) {
                return "Epic";
              }
              if (tokenData.rarityNumber >= 50 && tokenData.rarityNumber <= 149) {
                return "Rare";
              }
              if (
                tokenData.rarityNumber >= 150 &&
                tokenData.rarityNumber <= 349
              ) {
                return "Uncommon";
              }
              if (tokenData.rarityNumber >= 350) {
                return "Common";
              }
            };
  
            let rarityMark = setRarityMark();
  
            document
              .getElementById("rarityMark")
              .setAttribute("class", rarityMark);
            document.getElementById("rarityMark").textContent = rarityMark;
          });
        }
  
        const checkBtn = document.getElementById("checkBtn");
  
        checkBtn.addEventListener("click", () => {
          searchToken();
        });
  
        async function GetAllDataOnce() {
          const querySnapshot = await getDocs(collection(db, "groups"));
          let groupsTitle = document.getElementsByClassName("groupTitle");
  
          var groups = [];
          let n = 0;
          querySnapshot.forEach((doc) => {
            groupsTitle[n].textContent = doc.id;
            groups.push(doc.data());
            n++;
          });
  
          let tokensEl = document.getElementsByClassName("tokens");
  
          //groups = groups.map(el => el.sort((a, b) => a.))
          groups = groups.map((el) => {
            let arr = [];
            for (let key in el) {
              arr.push({ key: key, value: el[key] });
            }
            return arr;
          });
  
          groups = groups.map((el) => {
            el.sort((a, b) => {
              return +a.value > +b.value ? 1 : -1;
            });
            return el;
          });
  
          groups.forEach((groupEl, index) => {
            groupEl.forEach((trait) => {
              var el = document.createElement("div");
              el.setAttribute("class", "token");
              var firstChild = document.createElement("img");
              firstChild.setAttribute("class", "tokenImg");
  
              if (trait.key !== "None") {
                firstChild.setAttribute(
                  "src",
                  "img/traits/" + encodeURI(trait.key) + ".png"
                );
              }
  
              var secondChild = document.createElement("div");
              secondChild.setAttribute("class", "tokenPercent");
              secondChild.textContent = Number(trait.value).toFixed(1) + "%";
              var thirdChild = document.createElement("div");
              thirdChild.setAttribute("class", "tokenName");
              thirdChild.textContent = trait.key;
  
              el.appendChild(firstChild);
              el.appendChild(secondChild);
              el.appendChild(thirdChild);
  
              tokensEl[index].appendChild(el);
            });
          });
          //array.push(el);
  
          // const groupsElements = document.getElementById("group1");
          // groupsElements.appendChild(el);
        }
        window.onload = () => {
          GetAllDataOnce();
          searchToken(254);
        };
