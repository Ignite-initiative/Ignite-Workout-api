const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec app_db pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres()
      return
    }

    console.log("\n🟢 Postgres está aceitando conexões!\n")
  }
}

process.stdout.write("\n\n🔴 Esperando Postgres aceitar conexões")
checkPostgres()