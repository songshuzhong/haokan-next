import React from 'react';
import {Layout} from '../src/components/lib/layout';

import '../src/styles/margin.less';

const Margin = () => {
    return (
        <Layout>
            <div className='div1'>1</div>
            <div className='div2'>2</div>
            <section className="father">
                <div className="son">
                    <span>
                    <img src="https://p2.ssl.cdn.btime.com/t0167d9ebac0d0e1828.jpg" alt="" width="200px" />
                        王也, 武当派弟子（现已离开武当），八奇技之一风后奇门的继承人，靠占卜悟出天道，却又作出甘于投身乱世的选择。外表一副老好人的温良相，谦谦有礼如温吞水般，做事也经常是一副没精打采，貌似没睡醒的样子。优哉游哉还脾气软，代表举动经常是歉意笑着作出让步。似乎对什么都无所谓，一副悠然道人之姿，但是在涉及到家人安危时毫不含糊，甚至为此做出过有失冷静的举动。不小心爆粗都会拜祖道歉的出家人，实力在后生一辈中甚至称得上头筹，暂时只有一次完全没预料到地阴沟里翻船。
                    </span>
                </div>
            </section>
        </Layout>
    );
};

export default Margin;