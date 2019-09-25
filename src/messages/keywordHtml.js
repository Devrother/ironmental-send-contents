export default (keyword) => {
    return `
      <a href="https://www.google.com/search?q=${keyword}" style="text-decoration: none;">
        <div style="text-align: center; line-height: 40px; border-radius: 200px; width:170px; height:40px; margin: 5px auto;  background-color: #91AAB4; color:#FCFFF5;">
            <b>${keyword}</b>
        </div>
      </a>
    `
  };
