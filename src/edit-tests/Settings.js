import React from 'react';
import { Link } from 'react-router-dom';

class Settings extends React.Component {
    render() {
        let settings = this.props.settings;
        return (
            <div className="container my-5">
                <div className="row font-weight-bold">
                    <div className="col-5">Ключ</div>
                    <div className="col-4">Значение</div>
                    <div className="col-3">Действие</div>
                    <hr className="w-100" />
                </div>
                {Object.keys(settings).map((item, i) => (
                    <div className="row" key={i}>
                        <div className="col-5">{settings[item].text}</div>
                        <div className="col-4"> {settings[item].value}</div>
                        <div className="col-3">
                            <Link
                                to={{
                                    pathname: '/edit-settings',
                                    search: `?name=${item}&value=${settings[item].value}&text=${settings[item].text}&id=${settings[item].id}`,
                                }}
                                className="btn btn-warning btn-sm mx-1 px-2 py-0"
                            >
                                Исправить
                            </Link>
                        </div>
                        <hr className="w-100" />
                    </div>
                ))}
                <div className="row">
                <Link
                    className="btn btn-primary col-1"
                    to={{
                        pathname: `/`,
                    }}
                >
                    Назад
                </Link>
                </div>
            </div>
        );
    }
}

export default Settings;
