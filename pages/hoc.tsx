import React from 'react';
import {Layout} from '../src/components/lib/layout';

const formCreate = WrapperComponent => class extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            fields: {}
        };
    }

    onChange = key => e => {
        const {fields} = this.state;

        fields[key] = e.target.value;

        this.setState({fields});
    }

    getField = fieldname => {
        return {
            onChange: this.onChange(fieldname)
        }
    }

    onSubmit = () => {
        console.log(this.state.fields);
    }

    render() {
        const props = {
            onSubmit: this.onSubmit,
            getFields: this.getField
        };

        return <WrapperComponent {...props} />;
    }
}

@formCreate
export default class Hoc extends React.Component<any, any> {
    render() {
        return (
            <Layout
                styles={[
                    'https://songshuzhong.github.io/visualizer/static/bower_components/bootstrap/dist/css/bootstrap.min.css'
                ]}
            >

                <div className='form-group'>
                    <label htmlFor='name'>名称：</label>
                    <input type='text' className='form-control' placeholder='请输入名称' {...this.props.getFields('username')} />
                </div>
                <div className='form-group'>
                    <label htmlFor='name'>密码：</label>
                    <input type='text' className='form-control' placeholder='请输入密码' {...this.props.getFields('password')} />
                </div>
                <button className='btn btn-default' onClick={this.props.onSubmit}>提交</button>
            </Layout>
        );
    }
}