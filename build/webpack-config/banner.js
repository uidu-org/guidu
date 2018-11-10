// @flow

const chalk = require('chalk');

function print(msg /*: Array<String>*/) {
  console.log(msg.join('\n'));
}

function redBadge(label /*: string */) {
  return chalk.bgRed.black(` ${label} `);
}

function devServerBanner(
  {
    workspaces,
    workspacesGlob,
    isAll,
    port,
    host,
  } /*: { workspaces: Array<{ name: string, dir: string }>, workspacesGlob: string, isAll: boolean, port: number, host: string } */,
) {
  const msg /*: Array<any> */ = [''];
  const wsNamePadLength = workspaces.reduce(
    (acc, ws) => (ws.name.length > acc ? ws.name.length : acc),
    0,
  );

  const serverUrl = `http://${host}:${port}`;
  msg.push(chalk.bold(`> Open ${chalk.yellow(serverUrl)}`), '');

  if (isAll) {
    msg.push(
      chalk.blue(`Running dev server with ${chalk.bold('"all"')} packages.`),
    );
  } else {
    msg.push(
      chalk.blue(
        `Running dev server with packages matching ${chalk.bold(
          '"' + workspacesGlob + '"',
        )} pattern:`,
      ),
      '',
      ...workspaces.map(
        ws =>
          `– ${ws.name.padEnd(wsNamePadLength, ' ')}   ${chalk.dim(
            `[http://${host}:${port}/packages${ws.dir.split('packages')[1]}]`,
          )}`,
      ),
    );
    // We'll push this message on again in case there were lots of lines printed above, we still want
    // to see this
    msg.push(chalk.bold(`> Open ${chalk.yellow(serverUrl)}`), '');
  }

  msg.push('');

  return msg;
}

function buildBanner() /*: any */ {
  return [
    '',
    chalk.yellow(`Building with ${chalk.bold('"all"')} packages.`),
    '',
  ];
}

function errorMsg(
  { title, msg } /*: { title: string, msg: string } */,
) /*: any */ {
  return ['', chalk.red(`${redBadge('ERROR')} ${title}:`), '', msg, ''];
}

module.exports = { devServerBanner, buildBanner, errorMsg, print };
