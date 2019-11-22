import React, {useState} from 'react';

import {Layout} from '../src/components/lib/layout';

const hoc = IForm => () => {
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
        console.log(formData);
    };

    const props = {
        formData,
        onSubmit,
        getFields
    };

    return <IForm {...props} />;
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
            <button className='btn btn-default' onClick={props.onSubmit}>提交</button>
        </Layout>
    );
};

export default hoc(Form);
