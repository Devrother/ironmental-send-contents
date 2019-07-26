export default (question, interviewId, subscriberId) => {
  return `<a href="https://ironmental.net"><img src="https://ironmental-bucket.s3.ap-northeast-2.amazonaws.com/ironmental_logo_v2.png" style="display: block; width: 128px; margin: 0 auto;"/></a>
    <div style="max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: justify; background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 4px; color: #6d7e8f; margin-top: 0.5rem; box-sizing: border-box;">
      <b style="black">${question} </b>
    </div>
    
    <div>
        <a href="https://ironmental.net/interviews/${interviewId}" style="text-decoration: none; width: 400px; text-align:center; display:block; margin: 0 auto; margin-top: 1rem; background: #33b5e5!important; padding-top: 1rem; color: white; font-size: 1.25rem; padding-bottom: 1rem; font-weight: 600; border-radius: 4px;">
            답변 보기
        </a>
    </div>

    <div style="text-align: center; margin-top: 1rem; color: #868e96; font-size: 0.85rem;">
        <div>답변을 참고하시려면 위 버튼을 클릭해주세요 :)</div>
    </div>
    
    <div style="text-align: center; margin-top: 1rem; color: #868e96; font-size: 0.85rem;">
        <div>
            구독 해지를 원하시면
            <a href="https://ironmental.net/subscribers/${subscriberId}">
                해지하기
            </a>
            버튼을 눌러주세요 ㅠ.ㅠ
        </div>
    </div>`
};
