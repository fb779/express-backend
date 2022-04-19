let user = null;

const checkLoginUser = () => {
    const token = localStorage.getItem('token');
    const urlAuth = `${window.location.origin}/api/auth`;

    fetch(urlAuth, {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token,
        },
        method: 'GET',
    })
        .then(async (resp) => {
            if (!resp.ok) {
                Promise.reject(Object.assign({}, {status: resp.status, statusText: resp.statusText}, await resp.json()));
            }
            return resp.json();
        })
        .then(({user: usDb, token}) => {
            // localStorage.setItem('user', JSON.stringify(user));
            user = usDb;
            localStorage.setItem('token', token);
            document.title = `${document.title} - ${user.first_name} ${user.last_name}`;
        })
        .catch((err) => {
            console.log(err);
            localStorage.clear();
            location.href = '/web-chat';
        });
};

const connectSocket = () => {
    /**
     * Socket client
     */
    const token = localStorage.getItem('token');

    const socket = io('/chat', {
        extraHeaders: {
            'x-token': token,
        },
    });

    socket.on('connect', () => {
        console.log(`conectado al servidor`);
    });

    socket.on('disconnect', () => {
        console.log(`desconectado del servidor`);
    });
};

const init = async () => {
    checkLoginUser();
    connectSocket();
};

init();
