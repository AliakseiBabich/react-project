import classNames from 'classnames';
import React from 'react';
import { useSort } from '../../../hooks/useSort';

const Table = props => {
  // sorting for the content
  const { items, requestSort, sortConfig } = useSort(props.contentData);

  const getClassNamesFor = name => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  // adding data to table header

  const header = props.headerData
    ? Object.entries(props.headerData).map(item => {
        return (
          <th
            key={item[0]}
            onClick={() => requestSort(item[0])}
            className={getClassNamesFor(item[0])}
          >
            {item[1]}
          </th>
        );
      })
    : null;

  // adding data to main content
  const content =
    items.length > 0
      ? items.map((c, i) => {
          let cells = [];
          if (typeof c === 'object') {
            Object.entries(c).map(item => {
              switch (item[0]) {
                case 'id':
                case 'type':
                case 'className':
                case 'question':
                  break;
                case 'name':
                  cells.push(
                    <td
                      key={item[0]}
                      onClick={props.onClick ? props.onClick : null}
                    >
                      {item[1]}
                    </td>
                  );
                  break;
                case 'saveDate':
                  cells.push(<td key={item[0]}>{item[1]}</td>);
                  break;
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

  // adding data to footer
  const footer = props.footerData
    ? props.footerData.map((f, i) => {
        return (
          <td key={i} colSpan={props.headerData.length}>
            {Object.keys(f)}: {Object.values(f)}
          </td>
        );
      })
    : null;

  const tableClass = classNames(`table`, props.className);

  return (
    <table className={tableClass}>
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
