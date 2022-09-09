import React from "react";
import PropTypes from "prop-types";
import CollapseWrapper from "../common/collapse";

const ComponentWrapper = ({ children }) => {
    return React.Children.map(children, (child, index) => {
        const config = {
            ...child.props,
            number: index
        };
        return React.cloneElement(child, config);
    });
};

const ChildrenExercise = () => {
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{" "}
                <code>React.Children.map</code> так и{" "}
                <code>React.Children.toArray</code>
            </p>
            <ComponentWrapper>
                <Component />
                <Component />
                <Component />
            </ComponentWrapper>
        </CollapseWrapper>
    );
};

const Component = ({ number }) => {
    return (
        <>
            <div><span>{number + 1}</span>&nbsp;Компонент списка</div>
        </>
    );
};

Component.propTypes = {
    number: PropTypes.number
};

export default ChildrenExercise;
