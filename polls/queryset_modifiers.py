def sort_by_property(qs, db_property:str, reverse = False):
    if reverse == False:
        sorted_qs = qs.order_by(db_property)
        return sorted_qs

    elif reverse == True:
        _db_property = "-"+ db_property
        sorted_qs = qs.order_by(_db_property)
        return sorted_qs

def sort_qs(queryset:dict, params:object, context:dict={}) -> dict:
    """
    returns a sorted qs or list based GET parameters

    qs: QuerySet

    params : request.GET

    context: { 'date_property': 'Model.date' }

    'timestamp' -> Broswer history
    'order_date' -> Orders
    'date_txn_intiated' -> Transactions
    'review_date' -> Reviews


    """
    sortParams = params.get('sort')
    if sortParams == "":
        return queryset

    if sortParams is not None:
            if sortParams == "do":
                    queryset = sort_by_property(queryset, 'created_at', reverse=False)
            if sortParams == "dn":
                queryset = sort_by_property(queryset, 'created_at', reverse=True)

    return queryset

def filter_qs(queryset, params):
    filter_params = params.get('status')

    if filter_params is not None:
        if filter_params == "active":
            queryset = queryset.filter(is_active = True)
        elif filter_params == "new":
            queryset = queryset.model.get_new_polls()
        elif filter_params == "completed":
            queryset = queryset.model.get_completed_polls()
        return queryset
    else:
        return queryset
