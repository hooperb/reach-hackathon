const GlobalStyles = () => (
  <style jsx global>{`
    @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,700;1,400&display=swap");

    body {
      margin: 0px;
      padding: 0px;
      overflow: hidden;
    }
    .holder {
      width: 400px;
      height: 300px;
      position: relative;
    }

    .frame {
      width: 100%;
      height: 100%;
    }

    .bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 40px;
    }

    .thank-you {
      position: absolute;
      left: 50;
      bottom: 60;
      margin-top: 50px;
      margin-left: 200px;
      background-color: #000;
      width: 100%;
      height: 100%;
    }

    .wallet-connect {
      position: absolute;
      margin-top: 100px;
      margin-left: 1200px;
      width: 100%;
    }

    .text {
      color: #fff;
      font-size: 45px;
      margin: 0 16px;
    }
    .text-small {
      color: #fff;
      font-size: 20px;
      margin: 0 16px;
    }

    .menu {
      position: absolute;
      left: 50;
      bottom: 60;
      margin-top: 150px;
      margin-left: 400px;
      background-color: pink;
      width: 100%;
      height: 500px;
    }

    .game-screen {
      position: absolute;
      left: 50;
      bottom: 60;
      margin-top: 200px;
      margin-left: 900px;
      background-color: green;
      width: 100%;
      height: 600px;
    }

    .retro {
      display: inline-block;
      vertical-align: middle;
      user-select: none;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      background: white;
      color: black;
      font-size: 20px;
      font-family: "Roboto Mono", sans-serif;
      font-weight: 400;
      text-align: left;
      border: 3px solid black !important;
      border-radius: 0;
      box-shadow: 3px 3px black, 5px 5px white;
      padding-right: 5%;
      margin-top: 20px;
    }

    .retro:hover {
      color: black;
      background: white;
    }

    .retro:active {
      background-color: white !important;
      color: black !important;
      box-shadow: 0px 0px white;
      transform: translateX(5px) translateY(2px);
    }

    .rbtn-small {
      box-shadow: 2px 2px black, 4px 4px white;
      padding: 10px;
    }

    .rbtn-big {
      box-shadow: 2px 2px black, 3px 3px white;
      padding: 20px;
    }

    .retro-img {
      display: inline-block;
      vertical-align: middle;
      user-select: none;
      font-size: 1rem;
      background: white;
      color: black;
      font-size: 20px;
      font-family: "Roboto Mono", sans-serif;
      font-weight: 400;
      text-align: center;
      border-radius: 0;
      box-shadow: 3px 3px black, 5px 5px white;
    }

    .retro-img:active {
      background-color: white !important;
      color: black !important;
      box-shadow: 0px 0px white;
      transform: translateX(5px) translateY(2px);
    }

    .emptyRedSquare {
      stroke-dasharray: 0, 32, 64, 32;
    }
  `}</style>
);

export default GlobalStyles;
