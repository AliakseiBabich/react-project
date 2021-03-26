import React from 'react';

const Table = props => {
  const header = props.headerData
    ? props.headerData.map((h, i) => {
        return <th key={h + i}>{h}</th>;
      })
    : null;
  const content = props.contentData
    ? props.contentData.map((c, i) => {
        let cells = [];
        if (typeof c === 'object') {
          Object.entries(c).map(item => {
            if (item[0] !== 'id') {
              cells.push(<td key={item[0]}>{item[1]}</td>);
            }
          });
        } else {
          return (
            <tr
              key={i}
              className={
                props.headerData.indexOf('Тип вопроса') != -1 ? 'navlink' : ''
              }
            >
              <td onClick={props.onClick}>{c}</td>
            </tr>
          );
        }
        return <tr key={c.id}>{cells}</tr>;
      })
    : null;
  const footer = props.footerData
    ? props.footerData.map((f, i) => {
        return (
          <td key={i} colSpan={props.headerData.length}>
            {Object.keys(f)}: {Object.values(f)}
          </td>
        );
      })
    : null;
  return (
    <table className={props.className ? `table ${props.className}` : `table`}>
      {header ? (
        <thead>
          <tr>{header}</tr>
        </thead>
      ) : null}
      {content ? <tbody>{content}</tbody> : props.children}
      {footer ? (
        <tfoot>
          <tr colSpan={props.headerData.length}>{footer}</tr>
        </tfoot>
      ) : null}
    </table>
  );
};

export default Table;
