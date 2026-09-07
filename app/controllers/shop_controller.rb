class ShopController < InertiaController
    before_action :require_authentication
    before_action :require_camp_access

    def index
        region = current_user.shop_region
        items = ShopItem.on_shelf.includes(:prices).filter_map do |item|
            logs = item.logs_for(region)
            next if logs.nil?
            {
                id: item.id,
                title: item.title,
                description: item.description,
                kind: item.kind,
                image_url: item.image_url,
                logs: logs,
                sold_out: item.sold_out?
            }
        end
        render inertia: "shop/index", props: {
            items: items,
            logs_balance: current_user.logs_balance,
            region: region,
            regions: Region::ALL.map {|code, label| {code: code, label: label}}
        }
    end

    def region
        code = params[:region].to_s
        return redirect_to shop_path, notice: "unsupported region :(" unless Region.codes.include?(code)
        current_user.update!(region: code)
        redirect_to shop_path, notice: "prices now shown for #{Region.label(code)}"
    end
end
