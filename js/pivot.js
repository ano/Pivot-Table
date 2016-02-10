var url = 'json.php';

        $.getJSON(url, function (data) {
            if (data != null) {
                console.log(data.rows);
                var rows = data.rows;
                var dimensions = [
                    {
                        title: 'Year',
                        value: 'Year'
                    },
                    {
                        title: 'Quater',
                        value: 'Quater'
                    },
					{
                        title: 'Month',
                        value: 'Month'
                    },
					{
						title: 'Inventory',
						value: 'Inventory'
					},
					{
						title: 'From',
						value: 'From'
					},
                    {
						title: 'To',
						value: 'To'
					},
                    {
						title: 'Office',
						value: 'Office'
					},
                    {
						title: 'Supplier',
						value: 'Supplier'
					},
					{
						title: 'Employee',
						value: 'Employee'
					}                  
                ];
                
                var reduce = function (row, memo) {
                    // the memo object starts as {} for each group, build it up
                    memo.count = (memo.count || 0) + 1;
                    var inventory_in = (row.Total_Inventory_Added) ? row.Total_Inventory_Added : 0;
                    memo.total_inventory_in = (memo.total_inventory_in || 0) + parseFloat(inventory_in);
                    
                    var inventory_out = (row.Total_Inventory_Removed) ? row.Total_Inventory_Removed : 0; 
                    memo.total_inventory_out = (memo.total_inventory_out || 0) + parseFloat(inventory_out);
                    
                    memo.total_inventory = (memo.total_inventory_in  || 0) - (memo.total_inventory_out || 0);
                    // be sure to return it when you're done for the next pass
                    return memo;
                };
                var calculations = [
                    {
                        title: '# of Transactions',
                        // "value" can also be a function
                        value: function (memo) {
                            return memo.count;
                        },
                        template: function (val, row) {
                            return val;
                        },
                        // you can also give a column a custom class (e.g. right align for numbers)
                        className: 'alignRight'
                    },{
                        title: 'Inventory In',
                        value: 'total_inventory_in',
                        template: function (val, row) {
                            var time;
                            
                            if(val){
                                time = val;
                            }else{
                                time = 0;
                            }
                            
                            return time + ' units';
                        }
                    },{
                        title: 'Inventory Out',
                        value: 'total_inventory_out',
                        template: function (val, row) {
                            var time;
                            if(val !==null){
                                time = val;
                            }else{
                                time = 0;
                            }
                            return time + ' units';
                        }
                    },{
                        title: 'Inventory On-hand',
                        value: 'total_inventory',
                        template: function (val, row) {
                            var time;
                            if(val !==null){
                                time = val;
                            }else{
                                time = 0;
                            }

                            return time + ' units';
                        }
                    }
                ];

                ReactPivot(document.getElementById('pivot'), {
                    rows: rows,
                    dimensions: dimensions,
                    calculations: calculations,
                    activeDimensions: ['Year', 'From', 'Inventory'],
                    reduce: reduce
                });
            }
        });