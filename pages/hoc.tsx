import React, {useState} from 'react';

import {Layout} from '../src/components/lib/layout';

const hoc = IForm => props => {
    const [formData, setFormData] = useState({});

    const onChange = key => e => {
        const newFormData = formData;

        newFormData[key] = e.target.value;

        setFormData(newFormData);
    };

    const getFields = key => {
        return {
            onChange: onChange(key)
        };
    };

    const onSubmit = () => {
        return {
            onClick: () => {
                fetch(`${props.apiPrefix}/sendBeacon`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                    .catch(error => console.log(error.toString()));
            }
        };
    };

    const state = {
        ...props,
        formData,
        onSubmit,
        getFields
    };

    return <IForm {...state} />;
};

const Form = props => {
    return (
        <Layout
            styles={[
                'https://songshuzhong.github.io/visualizer/static/bower_components/bootstrap/dist/css/bootstrap.min.css'
            ]}
        >
            <div className='form-group'>
                <label>姓名：</label>
                <input className='form-control' placeholder='请输入用户名称' {...props.getFields('username')} />
            </div>
            <div className='form-group'>
                <label>密码：</label>
                <input className='form-control' placeholder='请输入密码' {...props.getFields('password')} />
            </div>
            <button className='btn btn-default' {...props.onSubmit()}>提交</button>
        </Layout>
    );
};

export default hoc(Form);
