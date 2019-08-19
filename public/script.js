const username = prompt("What is your username?")

const socket = io('http://localhost:9000', {
    query: {
      username: username
    }
  });

  let nsSocket = "";

  socket.on('nsList', (nsData) => {
    let nameSpacesDiv = document.querySelector('.namespaces');
    nameSpacesDiv.innerHTML = "";

    nsData.forEach((ns) => {
      nameSpacesDiv.innerHTML += `<div class ='namespace' ns=${ns.endpoint}> <img src = ${ns.img} /> </div>`
    })

    Array.from(document.getElementsByClassName('namespace')).forEach((elem) => {
      elem.addEventListener('click', (e) => {
        const nsEndPoint = elem.getAttribute('ns');
        joinNs(nsEndPoint);
      })
    })

    joinNs('/jordan');

  }) 