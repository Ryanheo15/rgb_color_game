//SELECTORS
let index_main = $(".index_main");
let game_play = $("#game_play");
let play_btn = $(".play_btn");
let arrow = $(".arrow-transition");
let instructions = $(".instructions");
let show_arrow = $(".arrow");
let rgb_title = $(".rgb_title");
let color_display = $(".color_display");
let score_display = $(".score");
let enter = $(".enter");
let game_modal = $("#game_over");

//boxes
let boxes = document.querySelectorAll(".box");
let box1 = $(".box-1");
let box2 = $(".box-2");
let box3 = $(".box-3");
let box4 = $(".box-4");
let box5 = $(".box-5");
let box6 = $(".box-6");
let box7 = $(".box-7");
let box8 = $(".box-8");
let box9 = $(".box-9");

//hearts
let lives_display = $(".lives");
let heart_1 = $(".heart-1");
let heart_2 = $(".heart-2");
let heart_3 = $(".heart-3");

//sign up
let username = $(".username");
let password = $(".password");
let signup_btn = $(".signup_btn");
let signup_form = $(".signup_form");
let form_id = document.getElementById("signup");

//modal
let play_again = $(".again");

//login form
let login_form = document.getElementById("login_form");
let login_user = $(".login_user");
let login_pass = $(".login_pass");
let login_btn = $(".login_btn");
let login_false = $(".login_false");

//leaderboard
let leaderboard_body = $(".leaderboard_body");

//global variables
let score = 0;
let lives = 3;
let red_main;
let green_main;
let blue_main;
let select_box;

//HELPER FUNCTIONS
let clear = function() {
  //White screen flash --> resets the screen
    game_play.removeClass("bg-dark");
    lives_display.hide();
    enter.hide();

    //removes the boxes
    boxes.forEach((box) => {
      box.style.display = "none";
    });
}

//Generates new RGB
let newRGB = function() {
  red_main = Math.floor(Math.random() * 256);
  green_main = Math.floor(Math.random() * 256);
  blue_main = Math.floor(Math.random() * 256);

  select_box = Math.floor(Math.random() * boxes.length);
  for(let i = 0; i < boxes.length; i++){
    if(i === select_box){
      boxes[i].style.backgroundColor = `rgb(${red_main}, ${green_main}, ${blue_main})`;
    }
    else {
      let red_secondary = Math.floor(Math.random() * 256);
      let green_secondary = Math.floor(Math.random() * 256);
      let blue_secondary = Math.floor(Math.random() * 256);

      boxes[i].style.backgroundColor = `rgb(${red_secondary}, ${green_secondary}, ${blue_secondary})`;
    }
  }

  rgb_title.text(`RGB(${red_main}, ${green_main}, ${blue_main})`);
}

//displaying data in leaderboard
let display_data = function(ranking, username, score){
  let row = document.createElement("tr");
  row.innerHTML = `
    <th scope="row">${ranking}</th>
    <td>${username}</td>
    <td>${score}</td>
  `;

  leaderboard_body.append(row);
}

//EVENT LISTENERS

//load event
$(document).ready(() => {
  //Default site
  arrow.hide();
  game_play.hide();

  //Locates you to game play screen
  play_btn.click(() => {
    arrow.show();

    //STARTS GAME
    arrow.click(() => {
      //default
      game_play.show();
      index_main.hide("slow");
      instructions.hide();

      //resets session storage score to zero
      localStorage.setItem("session_score", 0);
      //Generate Default/initial RGB
      newRGB();

      //show instructions event listener
      show_arrow.click(() => {
        if(show_arrow.attr("class") === "fas fa-chevron-down ml-2 arrow"){
          show_arrow.removeClass("fas fa-chevron-down ml-2 arrow");
          show_arrow.addClass("fas fa-chevron-up ml-2 arrow");
          instructions.slideDown("slow");
        }
        else {
          show_arrow.removeClass("fas fa-chevron-up ml-2 arrow");
          show_arrow.addClass("fas fa-chevron-down ml-2 arrow");
          instructions.slideUp("slow");
        }
      });

      //Adding event listeners to clicked box
      boxes.forEach((box) => {
        box.addEventListener("click", () => {
          //Highlight box that was clicked
          boxes.forEach((box) => {
            if(box.classList.contains("selected")){
              box.classList.remove("selected");
            }
          });

          box.classList += " selected";
        });
      });

      //Enter event listener
      enter.click(() => {
        boxes.forEach((box) => {
          if(box.classList.contains("selected")){
            //Correct
            if(box.style.backgroundColor === `rgb(${red_main}, ${green_main}, ${blue_main})`){
              color_display.css("background-color", `rgb(${red_main}, ${green_main}, ${blue_main})`);
              rgb_title.addClass("text-white");
              rgb_title.text("CORRECT");
              score++;
              score_display.text(`SCORE: ${score}`);

              //Clearing the screen for a second
              clear();

              //Resetting the screen
              setTimeout(() => {
                boxes.forEach((box) => {
                  box.style.display = "";
                });

                game_play.addClass("bg-dark");
                lives_display.show();
                enter.show();
                color_display.css("background-color", "");
                rgb_title.removeClass("text-white");
                newRGB();
              }, 1500);

            }

            //Incorrect
            if(box.style.backgroundColor !== `rgb(${red_main}, ${green_main}, ${blue_main})`){

              //displaying the incorrect background
              color_display.css("background-color", "red");
              rgb_title.addClass("text-white");
              rgb_title.text("INCORRECT");

              lives--;
              if(lives == 2){
                heart_3.hide("slow");
                //reverting back to original background after 1.5 seconds
                setTimeout(() => {
                  color_display.css("background-color", "");
                  rgb_title.removeClass("text-white");
                  rgb_title.text(`RGB(${red_main}, ${green_main}, ${blue_main})`);
                }, 1500);
              }
              else if(lives == 1){
                heart_2.hide("slow");
                //reverting back to original background after 1.5 seconds
                setTimeout(() => {
                  color_display.css("background-color", "");
                  rgb_title.removeClass("text-white");
                  rgb_title.text(`RGB(${red_main}, ${green_main}, ${blue_main})`);
                }, 1500);
              }

              else if(lives == 0){
                heart_1.hide("slow");

                //game over --> sets the current score to a session
                localStorage.setItem("session_score", score);
                console.log(localStorage.getItem("session_score"));

                //displaying the incorrect background
                color_display.css("background-color", "red");
                rgb_title.addClass("text-white");
                rgb_title.text("INCORRECT");

                clear();
                game_modal.modal("show");
              }

            }
          }
        });
      });

    });// Game start

    //if play_again is selected
    play_again.click((reload) => {
      window.location.hash = "#game_play";
      window.location.reload(true);
    });

    //Default login settings
    login_false.hide();

    //Adding login functionality
    //login event listener
    login_btn.click( () => {
      let user = login_user.val();
      let pass = login_pass.val();
      let user_score = localStorage.getItem("session_score");

      let formData = new FormData(login_form);
      formData.append("score", user_score);

      let response = fetch("login.php", {
        method: "post",
        body: formData
      });

      response.then((res) => {
        return res.text();
      }).then((text) => {
        if(text === "correct"){
          window.location.replace("leaderboard.html");
        }

        if(text === "incorrect") {
          login_false.show();
        }

      }).catch((err) => {
        console.log(err);
      })

    });

  }); // relocation to game screen

  //default sign up page settings
  $(".exists").hide();

  //Collecting user data on the sign up page
  signup_form.submit((e) => {
    e.preventDefault();
    let user = username.val();
    let pass = password.val();
    let user_score = localStorage.getItem("session_score");

    let form = new FormData(form_id);
    form.append("score", user_score);

    let response = fetch("signup.php",{
      method: "post",
      body: form
    });

    response.then((res) => {
      return res.text();
    }).then((text) => {
      console.log(text);
      if(text === "user added"){
        window.location.replace("leaderboard.html");
      }
      else {
        $(".exists").show();
      }
    }).catch((err) => {
      console.log(err);
    });

  });

}); // Load event for index

//Load event for leaderboard
//displaying data on leaderboard

if($("body").hasClass("leaderboard")){
  $(document).ready(() => {
    //Retrieving data from the php file
    let response = fetch("retrieve_data.php");
    response.then((rep) => {
      return rep.json();
    }).then((json_data) => {

      for(let i = 0; i < json_data.length; i++){
        let username_data = json_data[i].username;
        let user_score = json_data[i].score;
        display_data(i+1, username_data, user_score);
      }
    }).catch((err) => {
      console.log(err);
    });

    //if play_again is selected
    play_again.click(() => {
      window.location.replace("index.html");
    });
  });
}
