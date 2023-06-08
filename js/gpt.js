let $input = document.querySelector('input')
let $button = document.querySelector('#submit_button')


let data = [{
    "role": "system",
    "content": "Assistant는 주어진 주제로 재미있는 이야기를 해준다."
}]

let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

$button.addEventListener('click', e => {
    e.preventDefault()
    userInputData = $input.value
    $input.value = ''

    data.push({
        "role": "system",
        "content": userInputData
    })

    loading()
    chatGptAPI()
})

function chatGptAPI() {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
    })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            // console.log(res.choices[0].message.content)
            document.querySelector('#contents').textContent = res.choices[0].message.content
        })

    // 아래 코드는 fetch 성공, 실패, 통신 중 여부와 상관없이 실행됩니다. 비동기에요.
    console.log('hello world')
}

function loading() {
    const element = document.getElementById('contents');
    element.innerHTML = '잠시만 기다려주세요!';
}