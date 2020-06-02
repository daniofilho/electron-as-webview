const { app, BrowserWindow, globalShortcut } = require("electron");

const config = require("./config.js");

let win;

function createWindow() {
  // Cria uma janela de navegação.
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    titleBarStyle: "hidden",
    icon: __dirname + "/assets/favicon.png",
    autoHideMenuBar: true,
    //alwaysOnTop: true, // sempre por cima das outras janelas
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // Oculta a title bar
  win.setMenuBarVisibility(false);

  // Carrega o arquivo index.html da aplicação
  //win.loadFile("index.html");

  // Carrega a URL específica
  win.loadURL(config.app_url);

  // Abre o DevTools.
  //win.webContents.openDevTools();
}

function toggleDevTools() {
  win.webContents.toggleDevTools();
}

// Rensponsável por criar atalhos do teclado
function createShortcuts() {
  // Abre o devtools
  globalShortcut.register("CmdOrCtrl+J", toggleDevTools);
}

// Esse método é chamado quando a inicialização do Electron
// estiver finalizada e pronta para criar a a janela.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow).then(createShortcuts);

// Finaliza quando todas as janelas estiverem fechadas
app.on("window-all-closed", () => {
  // No macOS é comum para aplicativos e sua barra de menu
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
