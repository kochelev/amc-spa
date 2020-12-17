const errorHandler = (error) => {

    // Request timeout has expired
    
    if (error.code && error.code === 'ECONNABORTED') {
        return 'Сервер не отвечает, проблемы с интернетом';
    }
    
    if (!error.response) {
        return 'Неизвестная ошибка';
    }

    const status = error.response.status;
    const message = error.response.data.message;
    
    switch (status) {
    case 400:
        switch (message) {
        case 'Wrong credentials.':
            return 'Неверные логин или пароль';
        case 'User already exists.':
            return 'Пользователь уже существует';
        case 'User doesn\'t exist.':
            return 'Пользователь не существует';
        case 'Missed required params.':
            return 'Не все обязательные поля заполнены';
        case 'The browser (or proxy) sent a request that this server could not understand.':
            return 'Некорректный запрос';
        case 'Token has been revoked.':
            return 'Токен недействителен';
        case 'Invalid token.':
            return 'Токен поврежден';
        case 'Token has expired.':
            return 'Истек срок действия токена';
        default:
            return 'Неизвестная ошибка';
        }
    case 401:
        return 'Требуется авторизация';
    case 403:
        return 'Доступ запрещен';
    case 404:
        return 'Не существует';
    case 500:
        return 'Ошибка сервера';
    default:
        return 'Неизвестная ошибка';
    }
};

export default errorHandler;