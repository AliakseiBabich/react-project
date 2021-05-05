import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSort } from '../../../hooks/useSort';

const Table = props => {
  const tableClass = classNames(`table`, props.className);

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
    ? Object.entries(props.headerData).map((item, i) => {
        return (
          <th
            key={i}
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
            Object.keys(props.headerData).map(headerKey => {
              Object.entries(c).map((item, i) => {
                const itemKey = item[0];
                const itemValue = item[1];
                if (headerKey === itemKey) {
                  switch (headerKey) {
                    case 'name':
                      cells.push(
                        <td
                          key={i}
                          onClick={props.onClick ? props.onClick : null}
                        >
                          {itemValue}
                        </td>
                      );
                      break;
                    case 'role':
                      cells.push(<td key={i}>{itemValue}</td>);
                      break;
                    case 'registerDate':
                      cells.push(<td key={i}>{itemValue}</td>);
                      break;
                    case 'saveDate':
                      cells.push(<td key={i}>{itemValue}</td>);
                      break;
                    case 'answersNumber':
                      cells.push(<td key={i}></td>);
                      break;
                    case 'surveyUrl':
                      cells.push(
                        <td key={i}>
                          <Link to={{ pathname: itemValue, state: c }}>
                            ссылка на опрос
                          </Link>
                        </td>
                      );
                      break;
                    default:
                      break;
                  }
                }
              });
            });
          } else {
            return (
              <tr
                key={i}
                className={
                  props.headerData.indexOf('Тип вопроса') === -1
                    ? 'navlink'
                    : ''
                }
              >
                <td onClick={props.onClick}>{c}</td>
              </tr>
            );
          }
          return <tr key={i}>{cells}</tr>;
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
