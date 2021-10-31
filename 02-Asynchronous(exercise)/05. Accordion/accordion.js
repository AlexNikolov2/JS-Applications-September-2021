function solution() {
        let section = document.getElementById("section");
      
        fetch(`http://localhost:3030/jsonstore/advanced/articles/list`)
          .then((res) => res.json())
          .then((data) => {
            let divEl = document.createElement("div");
            divEl.id = "accordion";
            data.forEach((element) => {
              let divEl = document.createElement("div");
              divEl.id = "accordion";
              let title = element.title;
              let id = element._id;
      
              fetch("http://localhost:3030/jsonstore/advanced/articles/details/" + id)
                .then((res) => res.json())
                .then((profileData) => {
                  let content = profileData.content;
                  divEl.innerHTML = elementGenerator(title, content);
                  section.appendChild(divEl);
                });
            });
          });
      
        function elementGenerator(title, content) {
          let dataTemplate= `
          <div class="head">${title}<span class="button" onclick="toggle(event)">More</span>
              <div id="extra">
                  <p>${content}</p>
              </div>
          </div>
          `;
          return dataTemplate;
        }
      
        function toggle(event) {
          if (event.target.textContent == "More") {
            event.target.nextElementSibling.style.display = "block";
            event.target.textContent = "Less";
          } else if (event.target.textContent == "Less") {
            event.target.nextElementSibling.style.display = "";
            event.target.textContent = "More";
          }
        }
}