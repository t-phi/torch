class DataGrid {
    constructor() {
        this.data = []; /// column based structure

        this.columnLabelList = [];
        this.rowLabelList = [];
        this.columnLabelIndices = new Map();   /// provides array of indices for a given label. allows for multiple columns having the same indices. labels are ordered.
        this.rowLabelIndices = new Map();   /// provides array of indices for a given label. allows for multiple columns having the same indices. labels are ordered.
        this.offset = 1; // indices are 1-based; not 0-based... ie: first element has row or column number of 1. --- consider passing into in constructor...

        this.init();
    }

    init()
    {

    }


    setColumnLabelByIndex(colNum, label)
    {
        this.columnLabelList[colNum-this.offset] = label;
        var indices = this.columnLabelIndices.get(label);
        if( indices == null)
        {
          indices = [colNum-this.offset];
        }
        else
        {
          indices.push(colNum);
        }
        if (CONFIG.DEBUG) console.log("column label indices, label: " + label + " indices ", indices);
        this.columnLabelIndices.set(label, indices);
        if (CONFIG.DEBUG) console.error(this.columnLabelIndices.get(label));
    }


    setRowLabelByIndex(rowNum, label)
    {
        this.rowLabelList[rowNum-this.offset] = label;
        var indices = this.rowLabelIndices.get(label);
        if( indices == null)
        {
          indices = [rowNum-this.offset];
        }
        else
        {
          indices.push(rowNum);
        }
        this.rowLabelIndices.set(label, indices);
    }

    setRowLabels(rowLabels)
    {
        this.rowLabelList = rowLabels;
        this.rowLabelIndices.clear();
        for( var i=0; i< rowLabels.length; i++)
        {
            var rowLabel = rowLabels[i];
            var indices = this.rowLabelIndices.get(rowLabel);
            if (indices == null)
            {
              indices = [i];
            }
            else{
              indices.push(i);
            }
        }
        this.rowLabelIndices.set(rowLabel, indices);
    }

    setColumnLabels(columnLabels)
    {
        this.columnLabelList = columnLabels;
        this.columnLabelIndices.clear();
        for( var i=0; i< columnLabels.length; i++)
        {
            var columnLabel = columnLabels[i];
            var indices = this.columnLabelIndices.get(columnLabel);
            if (indices == null)
            {
              indices = [i];
            }
            else{
              indices.push(i);
            }
            this.columnLabelIndices.set(columnLabel, indices);
        }
    }

    getColumnLabelByIndex(colNum)
    {
        return this.columnLabelList[colNum-this.offset];
    }

    getRowLabelByIndex(rowNum)
    {
        return this.rowLabelList[rowNum-this.offset];
    }

    getColumnIndicesByLabel(colLabel)
    {
        return this.columnLabelIndices.get(colLabel)
    }

    getRowIndicesByLabel(rowLabel)
    {
        return this.rowLabelIndices.get(rowLabel)
    }

    getColumnByIndex(colNum)
    {
        return this.data[colNum-this.offset];
    }

    // returns an array of arrays containing only the columns with the given label
    getColumnsByLabel(colLabel)
    {
       var indices = this.columnLabelIndices.get(colLabel);
       var columns = [];

       indices.forEach( (colNum) => {
          columns.push(  this.data[colNum - this.offset]);
       })
       return columns;
    }

    getRowByIndex(rowNum)
    {
        var row = [];
        data.forEach( (column) => {
          if( Array.isArray(column)) row.push ( column[rowNum - this.offset ]);
        });
        return row;
    }

     // returns an array of arrays containing only the rows with the given label
    getRowsByLabel(rowLabel)
    {
       var indices = this.rowLabelIndices.get(rowLabel);
       var rows = [];

       indices.forEach( (rowNum) => {
          rows.push(  this.data[rowNum - this.offset]);
       })
       return rows;
    }



    appendRowByIndex(rowNum)
    {

    }

    appendRowByLabel(rowLabel)
    {

    }

    getValueByIndices(colNum, rowNum)
    {
        return this.data[colNum - this.offset][rowNum - this.offset];
    }

    getValuesByLabels(colLabel, rowLabel)
    {
      var result = [];
      var colIndices = this.columnLabelIndices(colLabel);
      var rowIndices = this.rowLabelIndices(rowLabel);
      colIndices.forEach( (colNum) => {
          rowIndices.forEach( (rowNum) => {
            result.push( this.getValueByIndices(colNum, rowNum));
          })
      });
      return result;
    }



    setValueByIndex(colNum, rowNum, value)
    {
        var column = this.data[colNum-this.offset];
        if (column == null)
          column = [];

        column[rowNum-this.offset] = value;
    }

    setColumnByIndex(colNum, data)
    {
        if( data == null) data = [];
        if( ! Array.isArray(data) ) data = [data];

        this.data[colNum-this.offset] = data;
    }

    appendColumn( column)
    {
      var numColumns = this.data.length;
      var lastIndex = numColumns + this.offset;
      this.setColumnByIndex(lastIndex, column);
    }
    appendColumnWithLabel( colLabel, column)
    {
      var numColumns = this.data.length;
      var lastIndex = numColumns + this.offset;
      this.setColumnByIndex(lastIndex, column);
      this.setColumnLabelByIndex(lastIndex, colLabel);
    }

    setRowByIndex(rowNum, data)
    {
        if( data == null) data = [];
        if( ! Array.isArray(data) ) data = [data];

        /// go through every column in the grid
        for(i=0; i < this.data.length; i++)
        {
            /// if the column isn't initialized, initialize it
            var column = data[i];
            if (column = null) data[i] = [];

            /// get the value in the provided data at the column number and populate the column at the appropriate row number
            var value = data[i];
            this.data[i][rowNum-this.offset] = value;

        }

    }



    // expects 2D array
    loadColumnBased2DArray(data, hasColumnLabels, hasRowLabels)
    {

        for(var i=0; i < data.length; i++)
        {
            var column = data[i];
            var columnLabel;
            if( hasColumnLabels ){    // column labels is the first element of each column
                columnLabel = column.shift();
                this.setColumnLabelByIndex(i+this.offset, columnLabel );
            }
            if((i==0) && hasRowLabels) // don't append first column until AFTER row labels have been removed,
                     /// but make sure column labels have been grabbed first
            {
                  /// row labels is the first column
                this.setRowLabels(column)

            }
            else{
                  this.appendColumn(column);
            }
        }

    }


   /* setValueByLabel(colLabel, rowLabel, value)
    {
       /// may not be a good function to have as label lookups may provide multiple matches that would all need to get updated
    }
    */

    get(queryObject)
    {

    }
    set(queryObject, value)
    {

    }


    toString()
    {
        var out = [];
        out.push("data: ", this.data);
        out.push("columnLabelList: " , this.columnLabelList);
        out.push("rowLabelList: " , this.rowLabelList);
        out.push( "offset: " , this.offset );
        out.push( "columnLabelIndices: {");


        this.columnLabelIndices.forEach( (value, key, map) => {
          out.push( "   key: ", key , " value: " , value );
        });
        out.push("}  rowLabelIndices: {" );

        this.rowLabelIndices.forEach( (value, key, map) => {
          out.push( "   key: " , key , " value: " , value  );
        });

        out.push( "}" );
        return out;

    }

}
